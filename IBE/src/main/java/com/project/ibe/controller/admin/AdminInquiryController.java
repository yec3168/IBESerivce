package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.AdminAnsweredInquiryResponse;
import com.project.ibe.dto.admin.AdminInquiryAnswerRequest;
import com.project.ibe.dto.admin.AdminInquiryResponse;
import com.project.ibe.services.admin.AdminInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/inquiry")
public class AdminInquiryController {

   private final AdminInquiryService adminInquiryService;

    @GetMapping
    public List<AdminInquiryResponse> getInquiryList() {
        return adminInquiryService.getInquiryList();
    }

    @PostMapping("/answer")
    public void setInquiryAnswer(@RequestBody AdminInquiryAnswerRequest adminInquiryAnswerRequest) {
        adminInquiryService.setInquiryAnswer(adminInquiryAnswerRequest);
    }

    @GetMapping("/answeredlist")
    public List<AdminInquiryResponse> getAnsweredInquiryList() {
        return adminInquiryService.getAnsweredInquiryList();
    }

    @PostMapping("/getinquiryanswer")
    public AdminAnsweredInquiryResponse AnsweredInquiryInfo(@RequestBody AdminInquiryAnswerRequest adminInquiryAnswerRequest) {
        return adminInquiryService.AnsweredInquiryInfo(adminInquiryAnswerRequest);
    }
}
