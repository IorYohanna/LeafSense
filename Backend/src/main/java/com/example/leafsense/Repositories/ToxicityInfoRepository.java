package com.example.leafsense.Repositories; 
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.leafsense.Entity.ToxicityInfo;
import java.util.Optional;

public interface ToxicityInfoRepository extends JpaRepository<ToxicityInfo, Long> {
    Optional<ToxicityInfo> findByPlantId(Long plantId);
    Optional<ToxicityInfo> findByPlant_ScientificName(String scientificName);
}
