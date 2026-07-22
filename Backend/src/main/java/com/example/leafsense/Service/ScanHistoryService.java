package com.example.leafsense.Service;

import java.util.List;
import com.example.leafsense.Responses.ScanRequest;
import com.example.leafsense.Responses.ScanResponse;

public interface ScanHistoryService {
    ScanResponse saveScan(ScanRequest scanRequestScanRequest);
    List<ScanResponse> findByUserId(Long userId);
    void deleteScan(Long scanId, Long userId);
    void deleteAllByUserId(Long userId);
}