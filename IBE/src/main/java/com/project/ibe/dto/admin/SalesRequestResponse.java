package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.Category;
import com.project.ibe.entity.common.ProductConditionState;
import com.project.ibe.entity.common.ProductTradeState;
import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
public class SalesRequestResponse {

    private Long productId;
    private String productTitle;
    private String productContent;
    private Long productPoint; // 상품 가격
    private ProductTradeState productTradeState; //거래상태
    private ProductConditionState productConditionState; // 물품상태
    private int productHit; // 조회수
    private Category productCategory;
    private LocalDateTime productCreatedAt; // 물품등록 신청 시간.
    private LocalDateTime productListedAt; // 관리자가 판매물품 등록허용 시간
    private Long memberId;
    private String productUploadStatus;
    private String MemberNickName;
    private String rejectionText;
}
