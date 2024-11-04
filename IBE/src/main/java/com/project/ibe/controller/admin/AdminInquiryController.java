package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.AdminInquiryResponse;
import com.project.ibe.services.admin.AdminInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
