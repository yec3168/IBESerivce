package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.SalesImgResponse;
import com.project.ibe.entity.product.ProductImg;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

public class SalesImgMapping {
    
    public void configureModelMapper(ModelMapper modelMapper) {
        modelMapper.addMappings(new PropertyMap<ProductImg, SalesImgResponse>() {
            @Override
            protected void configure() {
                // ProductImgId는 매핑하지 않음
                skip(destination.getProductId()); // ProductId에 대해 중복 매핑 방지
                map(source.getProduct().getProductId(), destination.getProductId()); // ProductId 매핑
            }
        });
    }
}
