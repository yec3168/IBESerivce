package com.project.ibe.dto.product;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductReplyRequest {
    private Long productId;
    private Long productCommentId;
    @NotBlank(message = "내용을 입력해주세요.")
    private String productReplyContent;
}
