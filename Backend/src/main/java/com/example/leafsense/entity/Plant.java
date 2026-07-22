package com.example.leafsense.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "plants")
@Getter
@Setter
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String scientificName;

    private String commonName;

    @Column(length = 2000)
    private String description;

    private String heightRange;
    private String spreadRange;
    private String leafType;
    private String plantingSeason;

    private String difficultyLevel;
    private String resistanceLevel;
    private String maintenanceLevel;

    private String temperatureRange;
    private String hardinessZone;

    @OneToOne(mappedBy = "plant", cascade = CascadeType.ALL, orphanRemoval = true)
    private CareInstruction careInstruction;

    @OneToOne(mappedBy = "plant", cascade = CascadeType.ALL, orphanRemoval = true)
    private ToxicityInfo toxicityInfo;

    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommonProblem> commonProblems;
}