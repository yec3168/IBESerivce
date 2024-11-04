package com.project.ibe.repository.inquiry;

import com.project.ibe.entity.inquiry.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {
    List<Inquiry> findByInquiryStatus(Boolean inquiryStatus);
}
