package com.Shoppingapp.gewa.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // we need this to create a table in the database
@Data // we need this to create getters and setters
@NoArgsConstructor // we need this to create a constructor
@AllArgsConstructor // we need this to create a constructor

// this class is used to create a product table in the database

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This will auto generate the id
    private Long id;
    private String name;
    private String description;
    private double price;
    private String brand;
    private String category;
    private boolean productAvailable;
    private int stockQuantity;
    private String imageUrl;
    private String imageName;
    @Lob
    private byte[] imageData;
    private String imageType;

}
