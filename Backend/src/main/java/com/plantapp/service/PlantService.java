// Backend/src/main/java/com/plantapp/service/PlantService.java
package com.plantapp.service;

import com.plantapp.dto.PlantResponse;
import com.plantapp.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PlantService {

    private final PlantRepository plantRepository;

    public PlantResponse findByScientificName(String scientificName) {
        return plantRepository.findByScientificNameIgnoreCase(scientificName)
                .map(PlantResponse::fromEntity)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Aucune fiche trouvee pour l'espece : " + scientificName
                                + " (verifier la correspondance entre labels.txt et la table Plant)"
                ));
    }
}
