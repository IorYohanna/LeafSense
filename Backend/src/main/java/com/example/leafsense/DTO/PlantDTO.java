package com.example.leafsense.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class PlantDTO {
    private Long id;
    private String scientificName;
    private String commonName;
    private String description;

    private String heightRange;
    private String spreadRange;
    private String leafType;
    private String plantingSeason;

    private String difficultyLevel;
    private String resistanceLevel;
    private String maintenanceLevel;

    private String temperatureRange;
    private String hardinessZone;

    private String usages;
    private String adaptationStrategies;
    private String historyLegend;
    private String nameHistory;
    private String symbolism;

    private CareInstructionDTO careInstruction;
    private ToxicityInfoDTO toxicityInfo;
    private List<CommonProblemDTO> commonProblems;
}