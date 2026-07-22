package com.example.leafsense.Responses;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter 
@Setter
public class ScanResponse {
    private Long id;
    private String scientificName;
    private String commonName;
    private Double confidence;
    private String imageUrl;
    private LocalDateTime scannedAt;
}