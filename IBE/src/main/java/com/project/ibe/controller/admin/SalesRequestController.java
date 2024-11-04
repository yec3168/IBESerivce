package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.ProductIdRequest;
import com.project.ibe.dto.admin.SalesNoRequest;
import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.services.admin.SalesRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

//    @PostMapping("/img")
//    public List<SalesImgResponse> getSalesImgList(@RequestBody ProductIdRequest productIdRequest) {
//        return salesRequestService.getSalesImgList(productIdRequest);
//    }
    @PostMapping("/yes")
    public void SalesRequestOK(@RequestBody ProductIdRequest productIdRequest) {
        salesRequestService.salesRequestYes(productIdRequest);
    }

    @PostMapping("/no")
    public void SalesRequestNO(@RequestBody SalesNoRequest salesNoRequest) {
        salesRequestService.salesRequestNO(salesNoRequest);
    }
}
