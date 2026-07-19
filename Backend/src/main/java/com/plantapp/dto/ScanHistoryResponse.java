// Backend/src/main/java/com/plantapp/dto/ScanHistoryResponse.java
package com.plantapp.dto;

import com.plantapp.entity.ScanHistory;

import java.time.Instant;
import java.util.List;

public record ScanHistoryResponse(
        Long id,
        String localUuid,
        Double confidence,
        Instant scannedAt,
        PlantResponse plant
) {
    public static ScanHistoryResponse fromEntity(ScanHistory scan) {
        return new ScanHistoryResponse(
                scan.getId(),
                scan.getLocalUuid(),
                scan.getConfidence(),
                scan.getScannedAt(),
                PlantResponse.fromEntity(scan.getPlant())
        );
    }

    // Reponse de /api/history/sync : quels localUuid ont ete acceptes / ignores (deja existants)
    public record SyncResult(
            List<String> synced,
            List<String> alreadySynced,
            List<String> failed
    ) {
    }
}
