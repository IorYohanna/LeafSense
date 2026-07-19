package com.plantapp.service;

import com.plantapp.dto.ScanHistoryRequest;
import com.plantapp.dto.ScanHistoryResponse;
import com.plantapp.entity.Plant;
import com.plantapp.entity.ScanHistory;
import com.plantapp.entity.User;
import com.plantapp.repository.PlantRepository;
import com.plantapp.repository.ScanHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final ScanHistoryRepository scanHistoryRepository;
    private final PlantRepository plantRepository;

    public List<ScanHistoryResponse> getHistory(User user) {
        return scanHistoryRepository.findByUserOrderByScannedAtDesc(user).stream()
                .map(ScanHistoryResponse::fromEntity)
                .toList();
    }

    public ScanHistoryResponse.SyncResult syncBatch(User user, ScanHistoryRequest.Batch batch) {
        List<String> synced = new ArrayList<>();
        List<String> alreadySynced = new ArrayList<>();
        List<String> failed = new ArrayList<>();

        for (ScanHistoryRequest.Item item : batch.scans()) {

            // Idempotence : si ce localUuid existe deja pour cet utilisateur, on ne le recree pas
            if (scanHistoryRepository.existsByLocalUuidAndUser(item.localUuid(), user)) {
                alreadySynced.add(item.localUuid());
                continue;
            }

            Plant plant = plantRepository.findByScientificNameIgnoreCase(item.scientificName())
                    .orElse(null);

            if (plant == null) {
                // Espece inconnue en base : on ignore ce scan plutot que de faire echouer tout le lot
                failed.add(item.localUuid());
                continue;
            }

            ScanHistory scan = ScanHistory.builder()
                    .localUuid(item.localUuid())
                    .user(user)
                    .plant(plant)
                    .confidence(item.confidence())
                    .scannedAt(item.scannedAt())
                    .build();

            scanHistoryRepository.save(scan);
            synced.add(item.localUuid());
        }

        return new ScanHistoryResponse.SyncResult(synced, alreadySynced, failed);
    }
}
