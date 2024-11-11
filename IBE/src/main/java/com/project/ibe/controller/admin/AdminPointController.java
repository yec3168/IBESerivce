package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.PointPayBackListResponse;
import com.project.ibe.services.admin.AdminPointService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/point")
public class AdminPointController {
    private final AdminPointService adminPointService;

    @GetMapping
    public List<PointPayBackListResponse> getPointPayBackList() {
        return adminPointService.getPointPayBackList();
    }
}
