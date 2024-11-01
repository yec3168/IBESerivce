package com.project.ibe.dto.product;

import com.project.ibe.entity.common.Category;
import com.project.ibe.entity.common.ProductConditionState;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductFormRequest {
    private Category productCategory;
    private String productTitle;
    private ProductConditionState productConditionState;
    private Long productPoint;
    private String productContent;

//    List<MultipartFile> images;
}
