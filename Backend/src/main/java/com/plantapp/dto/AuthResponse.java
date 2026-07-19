// Backend/src/main/java/com/plantapp/dto/AuthResponse.java
package com.plantapp.dto;

public record AuthResponse(
        String token,
        String email,
        long expiresInMs
) {
}
