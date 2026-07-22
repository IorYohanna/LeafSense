package com.example.leafsense.Repositories;

import com.example.leafsense.Entity.CareInstruction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CareInstructionRepository extends JpaRepository<CareInstruction, Long> {
    Optional<CareInstruction> findByPlantId(Long plantId);
    Optional<CareInstruction> findByPlant_ScientificName(String scientificName);
}
