// Backend/src/main/java/com/plantapp/controller/PlantController.java
package com.plantapp.controller;

import com.plantapp.dto.PlantResponse;
import com.plantapp.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
public class PlantController {

    private final PlantService plantService;

    // Appele par l'app mobile juste apres l'inference TFLite locale,
    // avec le nom scientifique deduit de labels.txt
    @GetMapping("/search")
    public ResponseEntity<PlantResponse> search(@RequestParam String scientificName) {
        return ResponseEntity.ok(plantService.findByScientificName(scientificName));
    }
}
