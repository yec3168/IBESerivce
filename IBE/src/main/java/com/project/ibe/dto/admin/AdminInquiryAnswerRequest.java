package com.project.ibe.dto.admin;

import lombok.Data;

@Data
public class AdminInquiryAnswerRequest {
    private String inquiryAnswerContent;
    private Long inquiryId;
    private Long memberId;
}
