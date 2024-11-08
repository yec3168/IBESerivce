package com.project.ibe.dto.order;

import lombok.Data;

@Data
public class OrderCompleteRequest {
    private Long orderId;
    private Long productId;
}
