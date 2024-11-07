package com.project.ibe.services.mypage;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.mypage.InquiryRequest;
import com.project.ibe.dto.mypage.InquiryResponse;
import com.project.ibe.dto.mypage.MemberInfoResponse;
import com.project.ibe.entity.inquiry.Inquiry;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.inquiry.InquiryRepository;
import com.project.ibe.repository.member.MemberRepository;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InquiryService {
    private final MemberRepository memberRepository;
    private final InquiryRepository inquiryRepository;

    // 문의 내역 조회
    public Response<List<InquiryResponse>> getInquiries(PrincipalDTO principal) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

        List<Inquiry> inquiryList = inquiryRepository.findByMemberMemberId(principal.getMemberId());
        if (inquiryList.isEmpty()) {
            throw new BusinessException("No inquiries found for the member", HttpStatus.NOT_FOUND);
        }

        // Inquiry -> InquiryResponse 변환
        List<InquiryResponse> inquiryResponses = inquiryList.stream()
                .map(this::convertToInquiryResponse)
                .collect(Collectors.toList());

        ResponseCode responseCode = ResponseCode.SUCCESS;
        String message = "Inquiries found successfully.";
        String code = HttpStatus.OK.toString();

        return new Response<>(responseCode, inquiryResponses, code);
    }

    // Inquiry -> InquiryResponse 변환 함수 (getInquires에서 사용)
    private InquiryResponse convertToInquiryResponse(Inquiry inquiry) {
        InquiryResponse response = new InquiryResponse();

        response.setInquiryCategory(inquiry.getInquiryCategory());
        response.setInquiryTitle(inquiry.getInquiryTitle());
        response.setInquiryContent(inquiry.getInquiryContent());
        response.setInquiryCreatedAt(inquiry.getInquiryCreatedAt());
        response.setInquiryAnswered(inquiry.getInquiryAnswered());

        return response;
    }

    // 일대일문의 등록
    public InquiryResponse postInquiry(PrincipalDTO principal, InquiryRequest request) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

        Inquiry inquiry = new Inquiry();
        InquiryResponse response = new InquiryResponse();

        if (request.getInquiryCategory() != null) {
            inquiry.setInquiryCategory(request.getInquiryCategory());
            response.setInquiryCategory(inquiry.getInquiryCategory());
        }
        if (request.getInquiryTitle() != null) {
            inquiry.setInquiryTitle(request.getInquiryTitle());
            response.setInquiryTitle(inquiry.getInquiryTitle());
        }
        if (request.getInquiryContent() != null) {
            inquiry.setInquiryContent(request.getInquiryContent());
            response.setInquiryContent(inquiry.getInquiryContent());
        }

        inquiry.setInquiryCreatedAt(LocalDateTime.now());
        response.setInquiryCreatedAt(inquiry.getInquiryCreatedAt());

        inquiry.setInquiryAnswered(false);
        response.setInquiryAnswered(inquiry.getInquiryAnswered());

        inquiryRepository.save(inquiry);

        return response;
    }
}
