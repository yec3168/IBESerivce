package com.project.ibe.dto.product;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductCommentRequest {
    private Long productId;
    @NotBlank(message = "내용을 입력해주세요.")
    private String productCommentContent;
}
