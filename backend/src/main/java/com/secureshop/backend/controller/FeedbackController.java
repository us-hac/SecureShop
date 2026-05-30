package com.secureshop.backend.controller;

import com.secureshop.backend.model.Feedback;
import com.secureshop.backend.model.User;
import com.secureshop.backend.repository.UserRepository;
import com.secureshop.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserRepository userRepository;

    // Any logged in user can submit feedback
    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback,
                                             Principal principal) {
        Optional<User> loggedInUser = userRepository.findByEmail(principal.getName());
        if (loggedInUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized!");
        }
        // Force userId to be the logged in user — cannot submit as someone else
        feedback.setUserId(loggedInUser.get().getId());
        feedback.setEmail(loggedInUser.get().getEmail());
        String result = feedbackService.submitFeedback(feedback);
        return ResponseEntity.ok(result);
    }

    // User can only see their OWN feedback
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserFeedback(@PathVariable Long userId,
                                              Principal principal) {
        Optional<User> loggedInUser = userRepository.findByEmail(principal.getName());
        if (loggedInUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized!");
        }
        // IDOR check
        if (!loggedInUser.get().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Access denied! You can only view your own feedback.");
        }
        List<Feedback> result = feedbackService.getUserFeedback(userId);
        return ResponseEntity.ok(result);
    }

    // Admin only — already protected by SecurityConfig
    @GetMapping("/all")
    public ResponseEntity<?> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }

    // Admin only — already protected by SecurityConfig
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.deleteFeedback(id));
    }
}