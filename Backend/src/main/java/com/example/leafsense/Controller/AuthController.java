package com.example.leafsense.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.leafsense.DTO.auth.ChangePasswordDTO;
import com.example.leafsense.DTO.auth.LoginDTO;
import com.example.leafsense.DTO.auth.RegisterDTO;
import com.example.leafsense.Responses.UserResponse;
import com.example.leafsense.Service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterDTO registerDTO) {
        return userService.register(registerDTO);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }

    @PutMapping("/change-password")
    public UserResponse changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        return userService.changePassword(changePasswordDTO);
    }
}