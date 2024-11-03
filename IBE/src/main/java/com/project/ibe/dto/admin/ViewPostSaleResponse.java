package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.Category;
import com.project.ibe.entity.common.ProductConditionState;
import com.project.ibe.entity.common.ProductTradeState;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ViewPostSaleResponse {
    private Long productId;
    private String productTitle;
    private String productContent;
    private Long productPoint; // 상품 가격
    private ProductTradeState productTradeState; //거래상태
    private ProductConditionState productConditionState; // 물품상태
    private Category productCategory;
    private LocalDateTime productListedAt; // 관리자가 판매물품 등록허용 시간
    private Long memberId;
    private int productUploadStatus;
    private String memberNickName;
}
