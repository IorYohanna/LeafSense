package com.example.leafsense.Service;

import com.example.leafsense.DTO.auth.ChangePasswordDTO;
import com.example.leafsense.DTO.auth.LoginDTO;
import com.example.leafsense.DTO.auth.RegisterDTO;
import com.example.leafsense.Responses.UserResponse;

public interface UserService {
    UserResponse register(RegisterDTO registerDTO);
    UserResponse login(LoginDTO loginDTO);
    UserResponse changePassword(ChangePasswordDTO changePasswordDTO);
}