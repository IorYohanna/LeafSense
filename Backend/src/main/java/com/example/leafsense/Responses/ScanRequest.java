package com.example.leafsense.Responses;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class ScanRequest {
    private Long userId;
    private String scientificName; // renvoyé par TFLite côté mobile
    private Double confidence;
    private String imageUrl;
}