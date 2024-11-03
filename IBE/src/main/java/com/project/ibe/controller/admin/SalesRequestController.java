package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.services.admin.SalesRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/board/salesrequest")
public class SalesRequestController {
    private final SalesRequestService salesRequestService;

    @GetMapping
    public List<SalesRequestResponse> getSalesRequestList() {
        return salesRequestService.getSalesRequestList();
    }
}
