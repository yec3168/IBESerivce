package com.project.ibe.repository.inquiry;

import com.project.ibe.entity.inquiry.Inquiry;
import com.project.ibe.entity.inquiry.InquiryAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InquiryAnswerRepository extends JpaRepository<InquiryAnswer, Integer> {
    Optional<InquiryAnswer> findByInquiry(Inquiry inquiry);
    Optional<InquiryAnswer> findByInquiry_InquiryId(Long inquiryId);
}
