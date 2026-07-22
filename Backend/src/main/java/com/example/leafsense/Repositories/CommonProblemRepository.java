package com.example.leafsense.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.leafsense.Entity.CommonProblem;
import java.util.List;

public interface CommonProblemRepository extends JpaRepository<CommonProblem, Long> {
    List<CommonProblem> findByPlantId(Long plantId);
    List<CommonProblem> findByPlant_ScientificName(String scientificName);
}