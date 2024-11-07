package com.project.ibe.dto.admin;

import com.project.ibe.entity.product.Product;
import lombok.Data;

@Data
public class SalesImgResponse {
    private Long productImgId;
    private String imagePath;
}
