package com.eduprajna.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

      @GetMapping("/")
    public String home() {
        return "Backend is running";
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Neenu Natural Backend");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }
   
}
