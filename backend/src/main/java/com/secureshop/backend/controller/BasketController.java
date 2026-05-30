package com.secureshop.backend.controller;

import com.secureshop.backend.model.BasketItem;
import com.secureshop.backend.model.User;
import com.secureshop.backend.repository.UserRepository;
import com.secureshop.backend.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/basket")
@CrossOrigin(origins = "http://localhost:5173")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getBasket(@PathVariable Long userId,Principal principal) {
        // Get logged in user from JWT token
        Optional<User> loggedInUser = userRepository.findByEmail(principal.getName());

        if (loggedInUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized!");
        }

        // IDOR check — verify requested userId matches logged in user
        if (!loggedInUser.get().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Access denied! You can only view your own basket.");
        }

        List<BasketItem> items = basketService.getBasket(userId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToBasket(@RequestParam Long userId,
                                          @RequestParam Long productId,
                                          @RequestParam int quantity,
                                          Principal principal) {
        // IDOR check
        Optional<User> loggedInUser = userRepository.findByEmail(principal.getName());
        if (loggedInUser.isEmpty() || !loggedInUser.get().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Access denied!");
        }

        String result = basketService.addToBasket(userId, productId, quantity);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<?> removeFromBasket(@PathVariable Long itemId,
                                               Principal principal) {
        String result = basketService.removeFromBasket(itemId);
        return ResponseEntity.ok(result);
    }
}