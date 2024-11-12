package com.project.ibe.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.common.Category;
import com.project.ibe.entity.common.ProductConditionState;
import com.project.ibe.entity.common.ProductTradeState;
import com.project.ibe.entity.member.Member;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProductDetailResponse {

    private Long productId;
    private String productCategory; // 카테고리
    private String productTitle;    //타이틀
    private Long productPoint;
    private String productTradeState; // 거래상태
    private int productHit; // 조회수
    private String productContent;

    private int productCommentCnt;//댓글수 예정

    private String productConditionState;

    private Member member; // 판매자 정보 ( 닉네임 만 front에서 바꿈.)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime productListedAt;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime productCreatedAt; // 물픔 등록 신청 시간. ( 나중에 허가 시간으로 바꿀 예정.)

    private List<String> imagePath; // 화면에 보여줄 이미지들
                                    // 대표이미지는 imagePath에 첫번째
}
