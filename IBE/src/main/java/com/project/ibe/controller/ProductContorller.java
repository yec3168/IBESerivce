package com.project.ibe.controller;

import com.project.ibe.dto.product.ProductFormRequest;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductContorller {

    private final ProductService productService;

    @PostMapping
    public Response saveProduct(@RequestPart("productFormRequest")ProductFormRequest productFormRequest,
                                @RequestPart("images")List<MultipartFile> images){
        try{
            return  new Response(ResponseCode.SUCCESS, productService.createProduct(productFormRequest, images), "200");
        }catch (Exception e){
            return  new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }
}
