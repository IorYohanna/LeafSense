package com.example.leafsense.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "care_instructions")
@Getter
@Setter
public class CareInstruction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "plant_id", nullable = false, unique = true)
    private Plant plant;

    private String wateringFrequency;

    @Column(length = 1000)
    private String wateringTips;

    private String sunlightNeeds;
    private String sunlightTolerance;
    private String soilType;
    private String pruningSeason;
    private String fertilizingFrequency;
    private String propagationMethod;
    private String repottingSeason;
}
