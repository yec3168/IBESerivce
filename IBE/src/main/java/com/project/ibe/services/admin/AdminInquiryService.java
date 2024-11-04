package com.project.ibe.services.admin;


import com.project.ibe.dto.admin.AdminInquiryResponse;
import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.entity.inquiry.Inquiry;
import com.project.ibe.repository.inquiry.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminInquiryService {
    private final InquiryRepository inquiryRepository;

    private final ModelMapper modelMapper;

    public List<AdminInquiryResponse> getInquiryList() {
        List<Inquiry> inquiryList = inquiryRepository.findByInquiryStatus(false);
        return inquiryList.stream()
                .map(inquiry -> {
                    AdminInquiryResponse response = modelMapper.map(inquiry, AdminInquiryResponse.class);
                    response.setMemberNickName(inquiry.getMember().getMemberNickName()); // memberNickName 설정
                    return response;
                })
                .collect(Collectors.toList());
    }

}
