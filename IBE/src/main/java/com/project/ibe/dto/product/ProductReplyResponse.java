package com.project.ibe.dto.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.product.Product;
import com.project.ibe.entity.product.ProductComment;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductReplyResponse {
    private Long productReplyId;
    private String productReplyContent;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime productReplyCreatedAt;

    private Member member;

    @JsonBackReference // 이 애너테이션을 추가
    private ProductComment productComment;
}
