package com.project.ibe.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.dto.product.ProductDetailResponse;
import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.common.ProductTradeState;
import com.project.ibe.entity.member.Member;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

//마이페이지에서 보여줄 구매목록.
@Data
public class OrderListResponse {
    // 물품 관련
    private String productTitle;
    private Member member; // 판매자 닉네임 가져오기 위함.
    private Long productPoint;
    private String imagePath; // 썸네일


    // order 관련
    private Long orderId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime orderDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime orderDeliveryDate;
    private OrderState orderState; // 현재 진행상태( 거래가능, 거래완료, 배송중, 배송완료)
                                    // 판매자가 승인하면 거래완료로 바뀜.
                                    // 물품도 거래가능 -> 거래완료
}
