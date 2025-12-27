package com.Shoppingapp.gewa.service;

import com.Shoppingapp.gewa.model.Product;
import com.Shoppingapp.gewa.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    public ProductRepo productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile image) throws IOException {

        product.setImageName(image.getOriginalFilename()); // this gets the image name
        product.setImageType(image.getContentType()); // this gets the image type
        product.setImageData(image.getBytes()); // this gets the image data as byte array
        return productRepo.save(product);
    }

    public Product updateProduct(Long id, Product product, MultipartFile image) throws IOException {
        Product existingProduct = productRepo.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setBrand(product.getBrand());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setStockQuantity(product.getStockQuantity());
            existingProduct.setProductAvailable(product.isProductAvailable());

            if (image != null && !image.isEmpty()) {
                existingProduct.setImageName(image.getOriginalFilename());
                existingProduct.setImageType(image.getContentType());
                existingProduct.setImageData(image.getBytes());
            }
            return productRepo.save(existingProduct);
        }
        return null;
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        // this will just tell the repo to give the products

        return productRepo.searchProducts(keyword);
    }
}
