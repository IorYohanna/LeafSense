// Backend/src/main/java/com/plantapp/entity/ScanHistory.java
package com.plantapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "scan_history", uniqueConstraints = {
        // localUuid unique PAR utilisateur : evite les doublons lors de la synchronisation
        @UniqueConstraint(name = "uk_scan_local_uuid_user", columnNames = {"local_uuid", "user_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScanHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // UUID v4 genere cote app mobile, sert de cle d'idempotence pour la sync
    @Column(name = "local_uuid", nullable = false)
    private String localUuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    // Score de confiance retourne par le modele TFLite (0.0 - 1.0)
    @Column(nullable = false)
    private Double confidence;

    @Column(name = "scanned_at", nullable = false)
    private Instant scannedAt;

    // Remarque : le flag "synced" existe uniquement cote local (SQLite),
    // il n'est pas persiste ici puisque l'existence meme de la ligne = synchronise.
}
