package com.project.ibe.controller.admin;


import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.services.admin.ViewPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/board/viewpost/sale")
public class ViewPostSaleController {
    private final ViewPostService viewPostService;

    @GetMapping
    public List<SalesRequestResponse> getAllSalesList() {
        return viewPostService.getAllSalesList();
    }
}
