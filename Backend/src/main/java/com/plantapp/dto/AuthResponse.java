package com.plantapp.dto;

public record AuthResponse(
        String token,
        String email,
        long expiresInMs
) {
}
