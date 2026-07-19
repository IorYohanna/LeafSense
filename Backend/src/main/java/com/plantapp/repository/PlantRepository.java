package com.plantapp.repository;

import com.plantapp.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    Optional<Plant> findByScientificNameIgnoreCase(String scientificName);
}
