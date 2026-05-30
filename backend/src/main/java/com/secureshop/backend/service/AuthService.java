package com.secureshop.backend.service;

import com.secureshop.backend.model.LoginResponse;
import com.secureshop.backend.model.User;
import com.secureshop.backend.repository.UserRepository;
import com.secureshop.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "Email already exists";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return "Email registered successfully";
    }

    public LoginResponse login(User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isEmpty()) {
            return new LoginResponse(null, "User not found!", null, null, null);
        }
        if (!passwordEncoder.matches(user.getPassword(), existing.get().getPassword())) {
            return new LoginResponse(null, "Wrong password!", null, null, null);
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(
            existing.get().getEmail(),
            existing.get().getRole()
        );

        return new LoginResponse(
            existing.get().getId(),
            "Login successful! Welcome " + existing.get().getName(),
            existing.get().getEmail(),
            existing.get().getRole(),
            token
        );
    }
}