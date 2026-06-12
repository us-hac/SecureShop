package com.secureshop.backend.service;

import com.secureshop.backend.model.BasketItem;
import com.secureshop.backend.model.Product;
import com.secureshop.backend.repository.BasketItemRepository;
import com.secureshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    private BasketItemRepository basketItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<BasketItem> getBasket(Long userId) {
        return basketItemRepository.findByUserId(userId);
    }

    public String addToBasket(Long userId, Long productId, int quantity) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            return "Product Not Found";
        }

        // Always fetch price from DATABASE — never trust frontend price
        double trustedPrice = product.get().getPrice();

        List<BasketItem> existingItems = basketItemRepository.findByUserId(userId);
        for (BasketItem item : existingItems) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                item.setPrice(trustedPrice * item.getQuantity());
                basketItemRepository.save(item);
                return "Quantity updated in basket!";
            }
        }

        BasketItem newItem = new BasketItem();
        newItem.setUserId(userId);
        newItem.setProductId(productId);
        newItem.setQuantity(quantity);
        newItem.setPrice(trustedPrice * quantity);
        basketItemRepository.save(newItem);
        return "Item added to basket!";
    }

    public String removeFromBasket(Long itemId) {
        basketItemRepository.deleteById(itemId);
        return "Item removed from basket!";
    }
}