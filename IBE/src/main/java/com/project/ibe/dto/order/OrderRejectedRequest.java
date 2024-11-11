package com.project.ibe.dto.order;

import lombok.Data;

@Data
public class OrderRejectedRequest {
    private Long orderId;
    private Long productId;
}
