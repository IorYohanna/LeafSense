// Backend/src/main/java/com/plantapp/dto/ScanHistoryRequest.java
package com.plantapp.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public class ScanHistoryRequest {

    // Un scan local envoye lors de la synchronisation
    public record Item(

            @NotBlank(message = "localUuid est requis")
            String localUuid,

            @NotBlank(message = "scientificName est requis")
            String scientificName,

            @NotNull(message = "confidence est requis")
            Double confidence,

            @NotNull(message = "scannedAt est requis")
            Instant scannedAt
    ) {
    }

    // Lot de scans envoyes en une seule requete vers /api/history/sync
    public record Batch(

            @NotEmpty(message = "La liste des scans ne peut pas etre vide")
            @Valid
            List<Item> scans
    ) {
    }
}
