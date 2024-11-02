package com.project.ibe.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.member.Member;
import lombok.Data;


import java.time.LocalDateTime;

@Data
public class ProductCommentResponse {
    // 댓글 목록 조회, 등록시 호출할 Response;
    private Long productCommentId;

    private String productCommentContent;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime productCommentCreatedAt;
    private Member member;

}
