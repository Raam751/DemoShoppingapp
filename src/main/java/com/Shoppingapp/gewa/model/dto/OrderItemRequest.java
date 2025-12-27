package com.Shoppingapp.gewa.model.dto;

public record OrderItemRequest(
        Long productId,
        int quantity) {
}
