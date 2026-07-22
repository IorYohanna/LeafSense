package com.example.leafsense.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.leafsense.Entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
