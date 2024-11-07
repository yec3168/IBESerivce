package com.project.ibe.dto.mypage;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.common.InquiryCategory;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class InquiryAnswerResponse {
    private Boolean inquiryAnswered;
    private String inquiryAnswerContent;
}
