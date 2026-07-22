package com.example.leafsense.Service;

import com.example.leafsense.DTO.PlantDTO;
import java.util.List;


public interface PlantService {
    PlantDTO findByScientificName(String scientificName);
    List<PlantDTO> findAll();
    List<PlantDTO> searchByCommonName(String commonName);
}