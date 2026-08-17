package com.example.leafsense.Entity;

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
    @Column(length = 500) private String humanToxicIf;
    @Column(length = 300) private String humanToxicParts;
    @Column(length = 1000) private String humanToxicityDetail;

    private boolean toxicToDogs;
    @Column(length = 500) private String dogToxicIf;
    @Column(length = 300) private String dogToxicParts;
    @Column(length = 1000) private String dogToxicityDetail;

    private boolean toxicToCats;
    @Column(length = 500) private String catToxicIf;
    @Column(length = 300) private String catToxicParts;
    @Column(length = 1000) private String catToxicityDetail;
}