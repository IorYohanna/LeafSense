package com.example.leafsense.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "toxicity_infos")
@Getter
@Setter
public class ToxicityInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "plant_id", nullable = false, unique = true)
    private Plant plant;

    private boolean toxicToHumans;
    @Column(length = 1000)
    private String humanToxicityDetail;

    private boolean toxicToDogs;
    @Column(length = 1000)
    private String dogToxicityDetail;

    private boolean toxicToCats;
    @Column(length = 1000)
    private String catToxicityDetail;

    private String toxicParts;
}
