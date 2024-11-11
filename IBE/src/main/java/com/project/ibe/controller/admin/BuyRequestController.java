package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.BuyRequestResponse;
import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.product.Product;
import com.project.ibe.services.admin.BuyRequestService;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/board/buyrequest")
public class BuyRequestController {

    private final BuyRequestService buyRequestService;

    @GetMapping
    public List<BuyRequestResponse> getOrderList () {
        return buyRequestService.getOrderList();
    }
}
