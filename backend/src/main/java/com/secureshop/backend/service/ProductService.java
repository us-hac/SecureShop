package com.secureshop.backend.service;

import com.secureshop.backend.model.Product;
import com.secureshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public List<Product> searchProducts(String name){
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Product addProduct(Product product){
        return productRepository.save(product);
    }
    
}
