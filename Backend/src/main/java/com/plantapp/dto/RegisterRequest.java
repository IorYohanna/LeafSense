// Backend/src/main/java/com/plantapp/dto/RegisterRequest.java
package com.plantapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank(message = "L'email est requis")
        @Email(message = "Format d'email invalide")
        String email,

        @NotBlank(message = "Le mot de passe est requis")
        @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caracteres")
        String password
) {
}
