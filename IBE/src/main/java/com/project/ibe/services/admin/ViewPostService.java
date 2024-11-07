package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.ProductIdRequest;
import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.dto.admin.ViewPostInfoResponse;
import com.project.ibe.entity.board.Board;
import com.project.ibe.entity.product.Product;
import com.project.ibe.repository.board.BoardRepository;
import com.project.ibe.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ViewPostService {

    private final ProductRepository productRepository;
    private final BoardRepository boardRepository;

    private final ModelMapper modelMapper;

    public List<SalesRequestResponse> getAllSalesList() {
        List<Product> productList = productRepository.findAll();
        return productList.stream()
                .map(product -> {
                    SalesRequestResponse response = modelMapper.map(product, SalesRequestResponse.class);
                    response.setMemberNickName(product.getMember().getMemberNickName()); // memberNickName 설정
                    return response;
                })
                .collect(Collectors.toList());
    }

    public List<ViewPostInfoResponse> getAllInfoList() {
        List<Board> infoList = boardRepository.findAll();
        return infoList.stream()
                .map(board -> {
                    ViewPostInfoResponse response = modelMapper.map(board, ViewPostInfoResponse.class);
                    response.setMemberNickName(board.getMember().getMemberNickName()); // memberNickName 설정
                    return response;
                })
                .collect(Collectors.toList());
    }
}
