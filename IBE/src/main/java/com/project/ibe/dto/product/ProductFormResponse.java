package com.project.ibe.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.common.Category;
import com.project.ibe.entity.common.ProductConditionState;
import com.project.ibe.entity.common.ProductTradeState;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProductFormResponse {
    private Long productId;

    private Category productCategory;
    private String productTitle;
    private ProductTradeState productTradeState;
    private ProductConditionState productConditionState;
    private Long productPoint;
    private String productContent;
    private int productHit; // 조회수

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime productCreatedAt; // 물품등록 신청 시간.

    List<String> filePathList;

}
