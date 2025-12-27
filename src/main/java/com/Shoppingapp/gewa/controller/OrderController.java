package com.Shoppingapp.gewa.controller;

import com.Shoppingapp.gewa.model.dto.OrderRequest;
import com.Shoppingapp.gewa.model.dto.OrderResponse;
import com.Shoppingapp.gewa.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/orders/place")
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest orderRequest) {
        OrderResponse orderResponse = orderService.placeOrder(orderRequest);
        return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }

    @GetMapping("/orders")
    public ResponseEntity<java.util.List<OrderResponse>> getAllOrders() {
        java.util.List<OrderResponse> orders = orderService.getAllOrderResponses();
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }
}
