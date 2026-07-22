package com.example.leafsense.Controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.example.leafsense.Responses.*;
import com.example.leafsense.Service.ScanHistoryService;


@RestController
@RequestMapping("/scans")
public class ScanController {

    private final ScanHistoryService scanHistoryService;

    ScanController(ScanHistoryService scanHistoryService) {
        this.scanHistoryService = scanHistoryService;
    }

    @PostMapping
    public ScanResponse saveScan(@RequestBody ScanRequest request) {
        return scanHistoryService.saveScan(request);
    }

    @GetMapping("/user/{userId}")
    public List<ScanResponse> getUserScans(@PathVariable Long userId) {
        return scanHistoryService.findByUserId(userId);
    }

    @DeleteMapping("/{scanId}/user/{userId}")
    public void deleteScan(@PathVariable Long scanId, @PathVariable Long userId) {
        scanHistoryService.deleteScan(scanId, userId);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteAllScans(@PathVariable Long userId) {
        scanHistoryService.deleteAllByUserId(userId);
    }
}