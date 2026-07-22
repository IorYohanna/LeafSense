package com.example.leafsense.Controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.example.leafsense.DTO.PlantDTO;
import com.example.leafsense.Service.PlantService;

@RestController
@RequestMapping("/plants")
public class PlantController {

    private final PlantService plantService;

    PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping("/{scientificName}")
    public PlantDTO getByScientificName(@PathVariable String scientificName) {
        return plantService.findByScientificName(scientificName);
    }

    @GetMapping
    public List<PlantDTO> getAll() {
        return plantService.findAll();
    }

    @GetMapping("/search")
    public List<PlantDTO> search(@RequestParam String name) {
        return plantService.searchByCommonName(name);
    }
}