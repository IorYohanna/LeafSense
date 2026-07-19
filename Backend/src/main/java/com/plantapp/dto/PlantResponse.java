// Backend/src/main/java/com/plantapp/dto/PlantResponse.java
package com.plantapp.dto;

import com.plantapp.entity.Plant;

public record PlantResponse(
        Long id,
        String commonName,
        String scientificName,
        String difficultyLevel,
        String toxicityHumans,
        String toxicityDogs,
        String toxicityCats,
        String wateringInfo,
        String lightRequirement,
        String climateInfo,
        Integer maxHeightCm,
        String leafType,
        String plantingPeriod
) {
    public static PlantResponse fromEntity(Plant plant) {
        return new PlantResponse(
                plant.getId(),
                plant.getCommonName(),
                plant.getScientificName(),
                plant.getDifficultyLevel(),
                plant.getToxicityHumans(),
                plant.getToxicityDogs(),
                plant.getToxicityCats(),
                plant.getWateringInfo(),
                plant.getLightRequirement(),
                plant.getClimateInfo(),
                plant.getMaxHeightCm(),
                plant.getLeafType(),
                plant.getPlantingPeriod()
        );
    }
}
