package com.imbs.courseapi.controller;

import com.imbs.courseapi.dto.LoginRequest;
import com.imbs.courseapi.dto.LoginResponse;
import com.imbs.courseapi.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        if ("admin".equals(request.getUsername()) && "password123".equals(request.getPassword())) {
            String token = jwtUtils.generateToken("admin");
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(401).build();
    }
}