package com.example.leafsense.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToxicityInfoDTO {
    private boolean toxicToHumans;
    private String humanToxicIf;
    private String humanToxicParts;
    private String humanToxicityDetail;

    private boolean toxicToDogs;
    private String dogToxicIf;
    private String dogToxicParts;
    private String dogToxicityDetail;

    private boolean toxicToCats;
    private String catToxicIf;
    private String catToxicParts;
    private String catToxicityDetail;
}