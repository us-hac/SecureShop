package com.secureshop.backend.service;

import com.secureshop.backend.model.Feedback;
import com.secureshop.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public String submitFeedback(Feedback feedback) {
        feedbackRepository.save(feedback);
        return "Feedback submitted successfully!";
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getUserFeedback(Long userId) {
        return feedbackRepository.findByUserId(userId);
    }

    public String deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
        return "Feedback deleted!";
    }
}