package com.Shoppingapp.gewa.service;

import com.Shoppingapp.gewa.model.Order;
import com.Shoppingapp.gewa.model.OrderItem;
import com.Shoppingapp.gewa.model.Product;
import com.Shoppingapp.gewa.model.dto.OrderItemRequest;
import com.Shoppingapp.gewa.model.dto.OrderItemResponse;
import com.Shoppingapp.gewa.model.dto.OrderRequest;
import com.Shoppingapp.gewa.model.dto.OrderResponse;
import com.Shoppingapp.gewa.repository.OrderItemRepo;
import com.Shoppingapp.gewa.repository.OrderRepo;
import com.Shoppingapp.gewa.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    public OrderResponse placeOrder(OrderRequest orderRequest) {
        Order order = new Order();
        String orderId = "ORD" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        order.setOrderId(orderId);
        order.setCustomerName(orderRequest.customerName());
        order.setEmail(orderRequest.email());
        order.setStatus("PLACED");
        order.setOrderDate(LocalDate.now());

        Order savedOrder = orderRepo.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItemRequest itemReq : orderRequest.items()) {
            Product product = productRepo.findById(itemReq.productId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(itemReq.quantity());
            item.setTotalPrice(BigDecimal.valueOf(product.getPrice()).multiply(BigDecimal.valueOf(itemReq.quantity())));
            item.setOrder(savedOrder);

            orderItemRepo.save(item);
            orderItems.add(item);

            itemResponses.add(new OrderItemResponse(product.getName(), item.getQuantity(), item.getTotalPrice()));
        }

        return new OrderResponse(
                savedOrder.getOrderId(),
                savedOrder.getCustomerName(),
                savedOrder.getEmail(),
                savedOrder.getStatus(),
                savedOrder.getOrderDate(),
                itemResponses);
    }

    public List<OrderResponse> getAllOrderResponses() {
        return null;
    }

}
