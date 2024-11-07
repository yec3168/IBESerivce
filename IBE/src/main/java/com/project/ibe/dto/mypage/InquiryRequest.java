package com.project.ibe.dto.mypage;

import com.project.ibe.entity.common.InquiryCategory;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InquiryRequest {
    private InquiryCategory inquiryCategory;
    private String inquiryTitle;
    private String inquiryContent;
}
