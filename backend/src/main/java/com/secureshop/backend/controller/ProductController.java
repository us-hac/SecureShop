package com.secureshop.backend.controller;
import com.secureshop.backend.model.Product;
import com.secureshop.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }
    
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String name){
        String sanitized = name.replaceAll("<[^>]*>", "");
        return productService.searchProducts(sanitized);
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }
    
}
