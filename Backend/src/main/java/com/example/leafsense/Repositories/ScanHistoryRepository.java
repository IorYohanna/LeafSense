package com.example.leafsense.Repositories;

import com.example.leafsense.Entity.ScanHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScanHistoryRepository extends JpaRepository<ScanHistory, Long> {
    List<ScanHistory> findByUserId(Long userId);
    List<ScanHistory> findByUserIdOrderByScannedAtDesc(Long userId);
    void deleteByUserId(Long userId);
    void deleteByIdAndUserId(Long id, Long userId);
}
