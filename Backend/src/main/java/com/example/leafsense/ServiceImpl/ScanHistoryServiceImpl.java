package com.example.leafsense.ServiceImpl;

import org.springframework.stereotype.Service;

import com.example.leafsense.Entity.Plant;
import com.example.leafsense.Entity.ScanHistory;
import com.example.leafsense.Entity.User;
import com.example.leafsense.Repositories.PlantRepository;
import com.example.leafsense.Repositories.ScanHistoryRepository;
import com.example.leafsense.Repositories.UserRepository;
import com.example.leafsense.Responses.ScanRequest;
import com.example.leafsense.Responses.ScanResponse;
import com.example.leafsense.Service.ScanHistoryService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ScanHistoryServiceImpl implements ScanHistoryService {

    private final ScanHistoryRepository scanHistoryRepository;
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;

    ScanHistoryServiceImpl(ScanHistoryRepository scanHistoryRepository, UserRepository userRepository, PlantRepository plantRepository) {
        this.scanHistoryRepository = scanHistoryRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
    }

    @Override
    public ScanResponse saveScan(ScanRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable"));

        Plant plant = plantRepository.findByScientificName(request.getScientificName())
                .orElseThrow(() -> new EntityNotFoundException("Plante introuvable: " + request.getScientificName()));

        ScanHistory scan = new ScanHistory();
        scan.setUser(user);
        scan.setPlant(plant);
        scan.setConfidence(request.getConfidence());
        scan.setImageUrl(request.getImageUrl());
        scan.setScannedAt(LocalDateTime.now());

        ScanHistory saved = scanHistoryRepository.save(scan);
        return toDTO(saved);
    }

    @Override
    public List<ScanResponse> findByUserId(Long userId) {
        return scanHistoryRepository.findByUserIdOrderByScannedAtDesc(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteScan(Long scanId, Long userId) {
        scanHistoryRepository.deleteByIdAndUserId(scanId, userId);
    }

    @Override
    public void deleteAllByUserId(Long userId) {
        scanHistoryRepository.deleteByUserId(userId);
    }

    private ScanResponse toDTO(ScanHistory scan) {
        ScanResponse dto = new ScanResponse();
        dto.setId(scan.getId());
        dto.setScientificName(scan.getPlant().getScientificName());
        dto.setCommonName(scan.getPlant().getCommonName());
        dto.setConfidence(scan.getConfidence());
        dto.setImageUrl(scan.getImageUrl());
        dto.setScannedAt(scan.getScannedAt());
        return dto;
    }
}