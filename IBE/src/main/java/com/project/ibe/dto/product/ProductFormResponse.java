package com.project.ibe.dto.product;

import com.project.ibe.entity.common.Category;
import com.project.ibe.entity.common.ProductConditionState;
import lombok.Data;

@Data
public class ProductFormResponse {
    private Category productCategory;
    private String productTitle;
    private ProductConditionState productConditionState;
    private Long productPoint;
    private String productContent;

}
