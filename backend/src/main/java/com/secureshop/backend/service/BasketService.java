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
public class BasketService{
    @Autowired
    private BasketItemRepository basketItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<BasketItem> getBasket(Long userId){
        return basketItemRepository.findByUserId(userId);
    }

    public String addToBasket(Long userId, Long productId, int quantity) {
    Optional<Product> product = productRepository.findById(productId);
    if (product.isEmpty()) {
        return "Product Not Found";
    }

    // Check if item already exists in basket
    List<BasketItem> existingItems = basketItemRepository.findByUserId(userId);
    for (BasketItem item : existingItems) {
        if (item.getProductId().equals(productId)) {
            // Item already exists — just increase quantity
            item.setQuantity(item.getQuantity() + quantity);
            item.setPrice(product.get().getPrice() * item.getQuantity());
            basketItemRepository.save(item);
            return "Quantity updated in basket!";
        }
    }

    // Item does not exist — add new row
    BasketItem item = new BasketItem();
    item.setUserId(userId);
    item.setProductId(productId);
    item.setQuantity(quantity);
    item.setPrice(product.get().getPrice() * quantity);
    basketItemRepository.save(item);
    return "Item added to basket!";
}
    public String removeFromBasket(Long itemId){
        basketItemRepository.deleteById(itemId);
        return "Item removed from basket!";
    }
}