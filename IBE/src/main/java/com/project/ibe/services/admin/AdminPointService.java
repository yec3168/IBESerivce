package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.MemberListResponse;
import com.project.ibe.dto.admin.PointPayBackListResponse;
import com.project.ibe.entity.points.PointPayBack;
import com.project.ibe.repository.points.PointPayBackRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminPointService {

    private final PointPayBackRepository pointPayBackRepository;
    private final ModelMapper modelMapper;

    public List<PointPayBackListResponse> getPointPayBackList() {
        return pointPayBackRepository.findAll().stream()
                .map(entity -> modelMapper.map(entity, PointPayBackListResponse.class))
                .toList(); //List<PointPayBack>
    }
}
