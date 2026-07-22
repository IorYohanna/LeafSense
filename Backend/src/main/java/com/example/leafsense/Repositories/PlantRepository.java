package com.example.leafsense.Repositories;
import com.example.leafsense.Entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    Optional<Plant> findByScientificName(String scientificName);
    List<Plant> findByCommonNameContainingIgnoreCase(String commonName);
    boolean existsByScientificName(String scientificName);
}
