package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.ProductIdRequest;
import com.project.ibe.dto.admin.SalesNoRequest;
import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.entity.common.ProductUploadStatus;
import com.project.ibe.entity.product.Product;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.member.MemberRepository;
import com.project.ibe.repository.product.ProductImgRepository;
import com.project.ibe.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SalesRequestService {
    private final MemberRepository memberRepository;

    private final ProductRepository productRepository;
    private final ProductImgRepository productImgRepository;

    private final ModelMapper modelMapper;

    public List<SalesRequestResponse> getSalesRequestList() {
        List<Product> productRequestList = productRepository.findByProductUploadStatus(ProductUploadStatus.STATUS_WAIT);
        return productRequestList.stream()
                .map(product -> {
                    SalesRequestResponse response = modelMapper.map(product, SalesRequestResponse.class);
                    response.setMemberNickName(product.getMember().getMemberNickName()); // memberNickName 설정
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void salesRequestYes(ProductIdRequest productIdRequest) {
        Product existProduct = productRepository.findById(productIdRequest.getProductId())
                .orElseThrow(() -> new BusinessException("Product Not Found", HttpStatus.NOT_FOUND));
                existProduct.setProductUploadStatus(ProductUploadStatus.STATUS_APPROVE);
                existProduct.setProductListedAt(LocalDateTime.now());
    }

    @Transactional
    public void salesRequestNO(SalesNoRequest salesNoRequest) {
        Product existProduct = productRepository.findById(salesNoRequest.getProductId())
                .orElseThrow(() -> new BusinessException("Product Not Found", HttpStatus.NOT_FOUND));
                existProduct.setProductUploadStatus(ProductUploadStatus.STATUS_REJECT);
                existProduct.setRejectionText(salesNoRequest.getRejectionText());
    }

//    public List<SalesImgResponse> getSalesImgList(ProductIdRequest productIdRequest) {
//
//        List<ProductImg> productImgList = productImgRepository.findByProduct_ProductId(productIdRequest.getProductId());
//        return productImgList.stream()
//                .map(entity -> {
//                    SalesImgResponse response = modelMapper.map(entity, SalesImgResponse.class);
//                    response.setProductId(entity.getProduct().getProductId()); // productId 설정
//                    return response;
//                })
//                .toList();
//    }


}
