package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.product.Product;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BuyRequestResponse {
    private Long orderId;
    private OrderState orderState;
    private LocalDateTime orderDate; //구매신청시간
    private LocalDateTime orderDeliveryDate; //배송도착시간  -> 따로 서비스에서 .now() 써줘야함.
    private Long productId; //판매물품 -> 판매자 정보도 들어있음.
    private String orderMemberEmail; // 구매자.
    private String sellerMemberEmail; //판매자.
    private String orderWayBill; //운송장 번호
}
