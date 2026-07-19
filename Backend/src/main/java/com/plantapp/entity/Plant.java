package com.plantapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "plants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "common_name", nullable = false)
    private String commonName;

    // Cle de correspondance avec les labels du modele TFLite (index -> scientificName)
    @Column(name = "scientific_name", nullable = false, unique = true)
    private String scientificName;

    // facile / modere / difficile
    @Column(name = "difficulty_level", nullable = false)
    private String difficultyLevel;

    @Column(name = "toxicity_humans")
    private String toxicityHumans;

    @Column(name = "toxicity_dogs")
    private String toxicityDogs;

    @Column(name = "toxicity_cats")
    private String toxicityCats;

    @Column(name = "watering_info", columnDefinition = "TEXT")
    private String wateringInfo;

    @Column(name = "light_requirement")
    private String lightRequirement;

    @Column(name = "climate_info", columnDefinition = "TEXT")
    private String climateInfo;

    @Column(name = "max_height_cm")
    private Integer maxHeightCm;

    @Column(name = "leaf_type")
    private String leafType;

    @Column(name = "planting_period")
    private String plantingPeriod;
}
