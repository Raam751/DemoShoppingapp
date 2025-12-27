package com.Shoppingapp.gewa.config;

import com.Shoppingapp.gewa.model.Product;
import com.Shoppingapp.gewa.repository.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

        private final ProductRepo productRepo;

        public DataSeeder(ProductRepo productRepo) {
                this.productRepo = productRepo;
        }

        @Override
        public void run(String... args) throws Exception {
                if (productRepo.count() == 0) {
                        System.out.println("No products found. Seeding database...");

                        List<Product> products = Arrays.asList(
                                        createProduct("haar", "golden necklace with transparent stones", "JLR", 99.00,
                                                        "Necklace", true, 5,
                                                        "https://silverpalace.in/uploads/products/img-14663896761b045d2c11ab3.87697156.jpg"),
                                        createProduct("jhumka", "earrings with beautiful design", "JLR", 399.00,
                                                        "Earrings", true, 5,
                                                        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT5Fw_hJAngN3QIhcFqZ6qskmlsVaGmg_dfjI1oqljQ69oP5WJ0WLRj5E_yYJOKSi55ntDcxXnHjmSDLPuNC2zwxUDnGjosLYHU_wkPEOH6apOh6WmIxFWk1w"),
                                        createProduct("bracelet", "bracelet with a sleek design", "JLR", 499.00,
                                                        "Bracelet", true, 5,
                                                        "https://t4.ftcdn.net/jpg/01/26/55/57/360_F_126555735_I1iCjWan0jDZz6iPKfVtrdX9mswmnJnw.jpg"));

                        productRepo.saveAll(products);
                        System.out.println("Database seeded with " + products.size() + " products.");
                } else {
                        System.out.println("Products already exist. Skipping seeding.");
                }
        }

        private Product createProduct(String name, String description, String brand, double price, String category,
                        boolean available, int stock, String imageUrl) {
                Product p = new Product();
                p.setName(name);
                p.setDescription(description);
                p.setBrand(brand);
                p.setPrice(price);
                p.setCategory(category);
                p.setProductAvailable(available);
                p.setStockQuantity(stock);
                p.setImageUrl(imageUrl);
                return p;
        }
}
