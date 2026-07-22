package com.example.leafsense.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToxicityInfoDTO {
    private boolean toxicToHumans;
    private String humanToxicityDetail;
    private boolean toxicToDogs;
    private String dogToxicityDetail;
    private boolean toxicToCats;
    private String catToxicityDetail;
    private String toxicParts;
}