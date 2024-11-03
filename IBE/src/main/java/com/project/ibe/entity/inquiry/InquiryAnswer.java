package com.project.ibe.entity.inquiry;

import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.mapping.ToOne;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
@Table(name = "inquiry_answer")
public class InquiryAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_answer_id")
    private Long inquiryAnswerId;

    @Column(nullable = false)
    private String inquiryAnswerContent;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime inquiryAnswerCreatedAt;

    @OneToOne
    @JoinColumn(name = "inquiry_id")
    private Inquiry inquiry;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
