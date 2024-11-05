package com.project.ibe.dto.admin;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class AdminAnsweredInquiryResponse {
    private Long inquiryId;
    private String inquiryAnswerContent;
    private LocalDateTime inquiryAnswerCreatedAt;
}
