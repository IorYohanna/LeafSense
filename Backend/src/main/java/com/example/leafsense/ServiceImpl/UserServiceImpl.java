package com.example.leafsense.ServiceImpl;

import org.springframework.stereotype.Service;

import com.example.leafsense.DTO.auth.ChangePasswordDTO;
import com.example.leafsense.DTO.auth.LoginDTO;
import com.example.leafsense.DTO.auth.RegisterDTO;
import com.example.leafsense.Entity.User;
import com.example.leafsense.Repositories.UserRepository;
import com.example.leafsense.Responses.UserResponse;
import com.example.leafsense.Service.UserService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse register(RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new EntityExistsException("Ce nom d'utilisateur existe déjà");
        }
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new EntityExistsException("Cet email existe déjà");
        }

        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(encoder.encode(registerDTO.getPassword()));

        User saved = userRepository.save(user);
        return toDTO(saved);
    }

    @Override
    public UserResponse login(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Identifiants invalides"));

        if (!encoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new EntityNotFoundException("Identifiants invalides");
        }

        return toDTO(user);
    }

    @Override
    public UserResponse changePassword(ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findById(changePasswordDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable"));

        if (!encoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Mot de passe actuel incorrect");
        }

        user.setPassword(encoder.encode(changePasswordDTO.getNewPassword()));
        User saved = userRepository.save(user);

        return toDTO(saved);
    }

    private UserResponse toDTO(User user) {
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        return dto;
    }
}