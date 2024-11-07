package com.project.ibe.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.member.Member;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//판매 목록 조회.
@Data
public class SellerListResponse {
    // 물품 관련
    private String productTitle;
    private String sellerMemberNickName; // 판매자 닉네임 가져오기 위함.
    private Long productPoint;
    private String imagePath; // 썸네일


    //구매 관련.
    private Long orderId;
    private String orderMemberNickName; // 구매자 닉네임.

    private OrderState orderState; // 현재 진행상태( 거래가능, 거래완료, 배송중, 배송완료, 구매 거부)
                                    // 판매자가 승인하면 거래완료로 바뀜.
                                    // 물품도 거래가능 -> 거래완료
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime orderDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime orderDeliveryDate;


//    // 해당 상품을 주문했으면 구매자 목록 버튼 클릭시  보여줄 리스트.
//    List<SellOrderListResponse> sellOrderListResponseList = new ArrayList<>();
}
