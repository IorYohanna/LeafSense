package com.example.leafsense.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "common_problems")
@Getter
@Setter
public class CommonProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    private String title;

    @Column(length = 1000)
    private String description;

    private String imageUrl;
}
