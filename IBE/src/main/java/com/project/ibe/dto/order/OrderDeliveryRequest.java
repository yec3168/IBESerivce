package com.project.ibe.dto.order;

import lombok.Data;

//배송중 ( 운송장번호 입력, 배송중으로 업데이트)
@Data
public class OrderDeliveryRequest {
    private Long orderId;
    private Long productId;
    private String orderWayBill; //운송장번호.
}
