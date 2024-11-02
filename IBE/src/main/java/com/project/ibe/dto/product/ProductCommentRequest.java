package com.project.ibe.dto.product;

import lombok.Data;

@Data
public class ProductCommentRequest {
    private Long productId;
    private String productCommentContent;
}
