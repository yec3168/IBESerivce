package com.project.ibe.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.common.OrderState;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderFormResponse {
    private Long orderId;
    private OrderState orderState;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime orderDate;
}
