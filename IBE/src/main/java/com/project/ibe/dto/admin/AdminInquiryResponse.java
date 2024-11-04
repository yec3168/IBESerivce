package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.InquiryCategory;
import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
public class AdminInquiryResponse {
    private InquiryCategory inquiryCategory;
    private String inquiryTitle;
    private String inquiryContent;
    private LocalDateTime inquiryCreatedAt;
    private Long member;
    private String memberNickName;
}
