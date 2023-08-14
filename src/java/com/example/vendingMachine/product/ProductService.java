package com.example.vendingMachine.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        Optional<Product> foundProduct = productRepository.findById(id);
        if (foundProduct.isPresent()) {
            return foundProduct.get();
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> foundProduct = productRepository.findById(id);
        if (foundProduct.isPresent()) {
            Product existingProduct = foundProduct.get();
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setCost(updatedProduct.getCost());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product increaseQuantity(Long id, int amount) {
        Optional<Product> foundProduct = productRepository.findById(id);
        if (foundProduct.isPresent()) {
            Product existingProduct = foundProduct.get();
            existingProduct.setQuantity(existingProduct.getQuantity() + amount);
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }

    public Product decreaseQuantity(Long id, int amount) {
        Optional<Product> foundProduct = productRepository.findById(id);
        if (foundProduct.isPresent()) {
            Product existingProduct = foundProduct.get();
            int newQuantity = existingProduct.getQuantity() - amount;
            if (newQuantity >= 0) {
                existingProduct.setQuantity(newQuantity);
                return productRepository.save(existingProduct);
            } else {
                throw new RuntimeException("Not enough quantity available for product with ID: " + id);
            }
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }
}