package com.secureshop.backend.controller;

import com.secureshop.backend.model.LoginResponse;
import com.secureshop.backend.model.User;
import com.secureshop.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user){
        return authService.register(user);
    }
  @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {
        return authService.login(user);
}
}