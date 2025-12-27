package com.Shoppingapp.gewa.repository;

import com.Shoppingapp.gewa.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {
}
