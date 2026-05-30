package com.secureshop.backend.model;

public class LoginResponse {
    private Long userId;
    private String message;
    private String email;
    private String role;
    private String token;

    public LoginResponse(Long userId, String message, String email, String role, String token) {
        this.userId = userId;
        this.message = message;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}