package com.example.leafsense.ServiceImpl;

import org.springframework.stereotype.Service;

import com.example.leafsense.DTO.*;
import com.example.leafsense.Entity.CommonProblem;
import com.example.leafsense.Entity.Plant;
import com.example.leafsense.Repositories.PlantRepository;
import com.example.leafsense.Service.PlantService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlantServiceImpl implements PlantService {

    private final PlantRepository plantRepository;

    PlantServiceImpl(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @Override
    public PlantDTO findByScientificName(String scientificName) {
        Plant plant = plantRepository.findByScientificName(scientificName)
                .orElseThrow(() -> new EntityNotFoundException("Plante introuvable: " + scientificName));
        return toDTO(plant);
    }

    @Override
    public List<PlantDTO> findAll() {
        return plantRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlantDTO> searchByCommonName(String commonName) {
        return plantRepository.findByCommonNameContainingIgnoreCase(commonName).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private PlantDTO toDTO(Plant plant) {
        PlantDTO dto = new PlantDTO();
        dto.setId(plant.getId());
        dto.setScientificName(plant.getScientificName());
        dto.setCommonName(plant.getCommonName());
        dto.setDescription(plant.getDescription());
        dto.setHeightRange(plant.getHeightRange());
        dto.setSpreadRange(plant.getSpreadRange());
        dto.setLeafType(plant.getLeafType());
        dto.setPlantingSeason(plant.getPlantingSeason());
        dto.setDifficultyLevel(plant.getDifficultyLevel());
        dto.setResistanceLevel(plant.getResistanceLevel());
        dto.setMaintenanceLevel(plant.getMaintenanceLevel());
        dto.setTemperatureRange(plant.getTemperatureRange());
        dto.setHardinessZone(plant.getHardinessZone());
        dto.setUsages(plant.getUsages());
        dto.setAdaptationStrategies(plant.getAdaptationStrategies());
        dto.setHistoryLegend(plant.getHistoryLegend());
        dto.setNameHistory(plant.getNameHistory());
        dto.setSymbolism(plant.getSymbolism());

        if (plant.getCareInstruction() != null) {
            var care = plant.getCareInstruction();
            CareInstructionDTO careDTO = new CareInstructionDTO();
            careDTO.setWateringFrequency(care.getWateringFrequency());
            careDTO.setWateringTips(care.getWateringTips());
            careDTO.setSunlightNeeds(care.getSunlightNeeds());
            careDTO.setSunlightTolerance(care.getSunlightTolerance());
            careDTO.setSoilType(care.getSoilType());
            careDTO.setPruningSeason(care.getPruningSeason());
            careDTO.setFertilizingFrequency(care.getFertilizingFrequency());
            careDTO.setPropagationMethod(care.getPropagationMethod());
            careDTO.setRepottingSeason(care.getRepottingSeason());
            careDTO.setAdvantages(care.getAdvantages());
            dto.setCareInstruction(careDTO);
        }

        if (plant.getToxicityInfo() != null) {
            var tox = plant.getToxicityInfo();
            ToxicityInfoDTO toxDTO = new ToxicityInfoDTO();
            toxDTO.setToxicToHumans(tox.isToxicToHumans());
            toxDTO.setHumanToxicityDetail(tox.getHumanToxicityDetail());
            toxDTO.setToxicToDogs(tox.isToxicToDogs());
            toxDTO.setDogToxicityDetail(tox.getDogToxicityDetail());
            toxDTO.setToxicToCats(tox.isToxicToCats());
            toxDTO.setCatToxicityDetail(tox.getCatToxicityDetail());
            toxDTO.setHumanToxicIf(tox.getHumanToxicIf());
            toxDTO.setHumanToxicParts(tox.getHumanToxicParts());
            toxDTO.setDogToxicIf(tox.getDogToxicIf());
            toxDTO.setDogToxicParts(tox.getDogToxicParts());
            toxDTO.setCatToxicIf(tox.getCatToxicIf());
            toxDTO.setCatToxicParts(tox.getCatToxicParts());
            dto.setToxicityInfo(toxDTO);
        }

        if (plant.getCommonProblems() != null) {
            List<CommonProblemDTO> problems = plant.getCommonProblems().stream()
                    .map(this::toProblemDTO)
                    .collect(Collectors.toList());
            dto.setCommonProblems(problems);
        }

        return dto;
    }

    private CommonProblemDTO toProblemDTO(CommonProblem problem) {
        CommonProblemDTO dto = new CommonProblemDTO();
        dto.setTitle(problem.getTitle());
        dto.setDescription(problem.getDescription());
        dto.setImageUrl(problem.getImageUrl());
        return dto;
    }
}