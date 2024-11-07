package com.project.ibe.services.admin;


import com.project.ibe.dto.admin.AdminAnsweredInquiryResponse;
import com.project.ibe.dto.admin.AdminInquiryAnswerRequest;
import com.project.ibe.dto.admin.AdminInquiryResponse;
import com.project.ibe.entity.inquiry.Inquiry;
import com.project.ibe.entity.inquiry.InquiryAnswer;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.inquiry.InquiryAnswerRepository;
import com.project.ibe.repository.inquiry.InquiryRepository;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminInquiryService {
    private final InquiryRepository inquiryRepository;
    private final InquiryAnswerRepository inquiryAnswerRepository;
    private final MemberRepository memberRepository;

    private final ModelMapper modelMapper;

    public List<AdminInquiryResponse> getInquiryList() {
        List<Inquiry> inquiryList = inquiryRepository.findByInquiryAnswered(false);
        return inquiryList.stream()
                .map(inquiry -> {
                    AdminInquiryResponse response = modelMapper.map(inquiry, AdminInquiryResponse.class);
                    response.setMemberNickName(inquiry.getMember().getMemberNickName()); // memberNickName 설정
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void setInquiryAnswer(AdminInquiryAnswerRequest adminInquiryAnswerRequest) {
        Inquiry existInquiry = inquiryRepository.findByInquiryId(adminInquiryAnswerRequest.getInquiryId())
                .orElseThrow(() -> new BusinessException("Inquiry Not Found", HttpStatus.NOT_FOUND));
        Member existMember = memberRepository.findByMemberId(adminInquiryAnswerRequest.getMemberId())
                .orElseThrow(() -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND));
        InquiryAnswer inquiryAnswer = new InquiryAnswer();
        inquiryAnswer.setInquiry(existInquiry);
        inquiryAnswer.setMember(existMember);
        inquiryAnswer.setInquiryAnswerCreatedAt(LocalDateTime.now());
        inquiryAnswer.setInquiryAnswerContent(adminInquiryAnswerRequest.getInquiryAnswerContent());
        inquiryAnswerRepository.save(inquiryAnswer);
        existInquiry.setInquiryAnswered(true);
    }

    public List<AdminInquiryResponse> getAnsweredInquiryList() {
        List<Inquiry> inquiryList = inquiryRepository.findByInquiryAnswered(true);
        return inquiryList.stream()
                .map(inquiry -> {
                    AdminInquiryResponse response = modelMapper.map(inquiry, AdminInquiryResponse.class);
                    response.setMemberNickName(inquiry.getMember().getMemberNickName()); // memberNickName 설정
                    return response;
                })
                .collect(Collectors.toList());
    }

    public AdminAnsweredInquiryResponse AnsweredInquiryInfo(AdminInquiryAnswerRequest adminInquiryAnswerRequest) {
        InquiryAnswer existInquiryAnswer = inquiryAnswerRepository
                .findByInquiry_InquiryId(adminInquiryAnswerRequest.getInquiryId())
                .orElseThrow(() -> new BusinessException("Inquiry Not Found", HttpStatus.NOT_FOUND));
        AdminAnsweredInquiryResponse response = new AdminAnsweredInquiryResponse();
        response.setInquiryAnswerContent(existInquiryAnswer.getInquiryAnswerContent());
        response.setInquiryAnswerCreatedAt(existInquiryAnswer.getInquiryAnswerCreatedAt());
        return response;
    }
}
