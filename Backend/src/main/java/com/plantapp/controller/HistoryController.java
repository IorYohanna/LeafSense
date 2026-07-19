// Backend/src/main/java/com/plantapp/controller/HistoryController.java
package com.plantapp.controller;

import com.plantapp.dto.ScanHistoryRequest;
import com.plantapp.dto.ScanHistoryResponse;
import com.plantapp.entity.User;
import com.plantapp.service.HistoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    public ResponseEntity<List<ScanHistoryResponse>> getHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(historyService.getHistory(user));
    }

    @PostMapping("/sync")
    public ResponseEntity<ScanHistoryResponse.SyncResult> sync(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ScanHistoryRequest.Batch batch
    ) {
        return ResponseEntity.ok(historyService.syncBatch(user, batch));
    }
}
