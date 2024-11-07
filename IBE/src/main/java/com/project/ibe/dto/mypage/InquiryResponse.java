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
public class InquiryResponse {
    private InquiryCategory inquiryCategory;
    private String inquiryTitle;
    private String inquiryContent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime inquiryCreatedAt;

    private Boolean inquiryAnswered;
}
