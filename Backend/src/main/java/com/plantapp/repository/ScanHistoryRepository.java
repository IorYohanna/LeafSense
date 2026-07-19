package com.plantapp.repository;

import com.plantapp.entity.ScanHistory;
import com.plantapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScanHistoryRepository extends JpaRepository<ScanHistory, Long> {

    List<ScanHistory> findByUserOrderByScannedAtDesc(User user);

    Optional<ScanHistory> findByLocalUuidAndUser(String localUuid, User user);

    boolean existsByLocalUuidAndUser(String localUuid, User user);
}
