package com.project.ibe.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductListResponse {
    private Long productId;
    private String productCategory; // 카테고리
    private String productTitle;    //타이틀
    private int productHit; // 조회수
    private int productCommentCnt;//댓글수 예정
    private String productConditionState;
    private String productTradeState; // 거래상태
    private Long productPoint;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime productListedAt;

    private String thumbnail;// 썸네일.
}
