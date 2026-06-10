package com.eduprajna.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/**
 * Sends transactional emails via Brevo HTTP API.
 * <p>
 * Endpoint: POST https://api.brevo.com/v3/smtp/email
 * <p>
 * This replaces JavaMailSender/SMTP which is blocked by Render's firewall
 * on ports 25, 465, and 587.  The HTTP API uses HTTPS port 443, which is
 * always allowed on every hosting provider.
 * <p>
 * Required environment variables (set in Render Dashboard):
 * <ul>
 *   <li>BREVO_API_KEY  — your Brevo API key (starts with xkeysib-…)</li>
 *   <li>MAIL_FROM_EMAIL — verified sender email in Brevo</li>
 *   <li>MAIL_FROM_NAME  — display name (defaults to "Sanatana Parampara")</li>
 * </ul>
 */
@Service
public class BrevoEmailSender {

    private static final Logger logger = LoggerFactory.getLogger(BrevoEmailSender.class);
    private static final String BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

    @Value("${brevo.api.key:}")
    private String apiKey;

    @Value("${mail.from.email:}")
    private String fromEmail;

    @Value("${mail.from.name:Hari}")
    private String fromName;

    private final RestTemplate restTemplate;

    public BrevoEmailSender(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @jakarta.annotation.PostConstruct
    public void init() {
        logger.info("BrevoEmailSender initialized — sender: {} <{}>", fromName, fromEmail);
        if (apiKey == null || apiKey.isBlank()) {
            logger.error("BREVO_API_KEY is not set! Email sending will fail.");
        }
    }

    // ------------------------------------------------------------------ public

    /**
     * Send a plain-text email.
     */
    public boolean sendTextEmail(String to, String subject, String textContent) {
        Map<String, Object> body = buildBasePayload(to, subject);
        body.put("textContent", textContent);
        return callBrevoApi(body, to, subject);
    }

    /**
     * Send an HTML email (no attachments).
     */
    public boolean sendHtmlEmail(String to, String subject, String htmlContent) {
        Map<String, Object> body = buildBasePayload(to, subject);
        body.put("htmlContent", htmlContent);

        byte[] logoBytes = getLogoBytes();
        if (logoBytes != null) {
            Map<String, String> logoAttachment = new HashMap<>();
            logoAttachment.put("content", Base64.getEncoder().encodeToString(logoBytes));
            logoAttachment.put("name", "logo.jpg"); // matches cid:logo
            body.put("attachment", List.of(logoAttachment));
        }

        return callBrevoApi(body, to, subject);
    }

    /**
     * Send an HTML email with a file attachment (e.g. PDF invoice).
     *
     * @param attachmentBytes raw bytes of the attachment
     * @param attachmentName  filename shown in the email (e.g. "invoice_42.pdf")
     */
    public boolean sendHtmlEmailWithAttachment(String to, String subject, String htmlContent,
                                                byte[] attachmentBytes, String attachmentName) {
        Map<String, Object> body = buildBasePayload(to, subject);
        body.put("htmlContent", htmlContent);

        List<Map<String, String>> attachmentsList = new ArrayList<>();

        // Add invoice PDF
        Map<String, String> invoiceAttachment = new HashMap<>();
        invoiceAttachment.put("content", Base64.getEncoder().encodeToString(attachmentBytes));
        invoiceAttachment.put("name", attachmentName);
        attachmentsList.add(invoiceAttachment);

        // Add logo inline
        byte[] logoBytes = getLogoBytes();
        if (logoBytes != null) {
            Map<String, String> logoAttachment = new HashMap<>();
            logoAttachment.put("content", Base64.getEncoder().encodeToString(logoBytes));
            logoAttachment.put("name", "logo.jpg"); // matches cid:logo
            attachmentsList.add(logoAttachment);
        }

        body.put("attachment", attachmentsList);

        return callBrevoApi(body, to, subject);
    }

    private byte[] getLogoBytes() {
        try {
            org.springframework.core.io.ClassPathResource resource = new org.springframework.core.io.ClassPathResource("static/images/logo.png");
            if (resource.exists()) {
                try (java.io.InputStream is = resource.getInputStream()) {
                    return is.readAllBytes();
                }
            }
        } catch (Exception e) {
            logger.warn("Could not load logo for inline attachment: {}", e.getMessage());
        }
        return null;
    }

    // ------------------------------------------------------------------ private

    private Map<String, Object> buildBasePayload(String to, String subject) {
        Map<String, Object> body = new HashMap<>();

        Map<String, String> sender = new HashMap<>();
        sender.put("name", fromName);
        sender.put("email", fromEmail);
        body.put("sender", sender);

        Map<String, String> recipient = new HashMap<>();
        recipient.put("email", to);
        body.put("to", List.of(recipient));

        body.put("subject", subject);
        return body;
    }

    private boolean callBrevoApi(Map<String, Object> body, String to, String subject) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    BREVO_API_URL, HttpMethod.POST, request, String.class);

            int status = response.getStatusCode().value();
            if (status >= 200 && status < 300) {
                logger.info("Brevo API success ({}): to={}, subject='{}'", status, to, subject);
                return true;
            } else {
                logger.error("Brevo API error ({}): to={}, subject='{}', response={}",
                        status, to, subject, response.getBody());
                return false;
            }
        } catch (Exception e) {
            logger.error("Brevo API call failed: to={}, subject='{}': {}",
                    to, subject, e.getMessage(), e);
            return false;
        }
    }
}
