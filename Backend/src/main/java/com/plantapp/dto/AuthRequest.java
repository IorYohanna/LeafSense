// Backend/src/main/java/com/plantapp/dto/AuthRequest.java
package com.plantapp.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(

        @NotBlank(message = "L'email est requis")
        String email,

        @NotBlank(message = "Le mot de passe est requis")
        String password
) {
}
