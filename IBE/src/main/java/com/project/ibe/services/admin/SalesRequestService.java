package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.SalesImgResponse;
import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.entity.product.Product;
import com.project.ibe.entity.product.ProductImg;
import com.project.ibe.repository.member.MemberRepository;
import com.project.ibe.repository.product.ProductImgRepository;
import com.project.ibe.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
        List<Product> productRequestList = productRepository.findByProductUploadStatus(1);
        return productRequestList.stream()
                .map(product -> {
                    SalesRequestResponse response = modelMapper.map(product, SalesRequestResponse.class);
                    response.setMemberNickName(product.getMember().getMemberNickName()); // memberNickName 설정
                    return response;
                })
                .collect(Collectors.toList());
    }

    public List<SalesImgResponse> getSalesImgList(Long productId) {
        List<ProductImg> productImgList = productImgRepository.findByProductId(productId);

    }
}
