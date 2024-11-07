package com.project.ibe.entity.inquiry;

import com.project.ibe.entity.common.InquiryCategory;
import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
@Table(name = "inquiry")
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_id")
    private Long inquiryId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private InquiryCategory inquiryCategory;

    @Column(nullable = false)
    private String inquiryTitle;

    @Column(nullable = false)
    private String inquiryContent;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime inquiryCreatedAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 답변 여부
    // false: 답변대기, true: 답변완료
    @Column(nullable = false, columnDefinition = "Boolean default false")
    private Boolean inquiryAnswered;
}
