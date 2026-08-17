package com.example.leafsense.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CareInstructionDTO {
    private String wateringFrequency;
    private String wateringTips;
    private String sunlightNeeds;
    private String sunlightTolerance;
    private String soilType;
    private String pruningSeason;
    private String fertilizingFrequency;
    private String propagationMethod;
    private String repottingSeason;
    private List<String> advantages;
}