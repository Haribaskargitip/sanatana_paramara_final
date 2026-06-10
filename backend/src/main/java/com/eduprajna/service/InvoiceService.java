package com.eduprajna.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Service for generating invoice PDFs.
 * Delegates PDF generation to EmailService which uses OpenPDF internally.
 */
@Service
public class InvoiceService {

    private static final Logger logger = LoggerFactory.getLogger(InvoiceService.class);

    private final EmailService emailService;

    public InvoiceService(EmailService emailService) {
        this.emailService = emailService;
    }

    /**
     * Generate a PDF invoice for an order.
     *
     * @param orderData Map containing order details:
     *                  orderId, email, name, total, subtotal, shippingFee,
     *                  deliveryOption, paymentMethod, items (List of Maps)
     * @return byte array of the generated PDF
     * @throws Exception if PDF generation fails
     */
    public byte[] generateInvoice(Map<String, Object> orderData) throws Exception {
        String orderId = String.valueOf(orderData.getOrDefault("orderId", "N/A"));
        logger.info("Generating invoice PDF for order: {}", orderId);
        byte[] pdf = emailService.generateInvoicePdf(orderData);
        logger.info("Invoice PDF generated successfully for order: {}, size: {} bytes", orderId, pdf.length);
        return pdf;
    }
}
