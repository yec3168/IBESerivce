package com.project.ibe.controller.admin;


import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.dto.admin.ViewPostInfoResponse;
import com.project.ibe.services.admin.ViewPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/board/viewpost")
public class ViewPostController {
    private final ViewPostService viewPostService;

    @GetMapping("/sale")
    public List<SalesRequestResponse> getAllSalesList() {
        return viewPostService.getAllSalesList();
    }

    @GetMapping("/info")
    public List<ViewPostInfoResponse> getAllInfoList() {
        return viewPostService.getAllInfoList();
    }
}
