package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.ProductIdRequest;
import com.project.ibe.dto.admin.SalesRequestResponse;
import com.project.ibe.dto.admin.ViewPostInfoResponse;
import com.project.ibe.entity.board.Board;
import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.order.Order;
import com.project.ibe.entity.product.Product;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.board.BoardRepository;
import com.project.ibe.repository.member.MemberRepository;
import com.project.ibe.repository.order.OrderRepository;
import com.project.ibe.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ViewPostService {

    private final ProductRepository productRepository;
    private final BoardRepository boardRepository;
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    private final ModelMapper modelMapper;

    public List<SalesRequestResponse> getAllSalesList() {
        List<Product> productList = productRepository.findAll();

        return productList.stream()
                .map(product -> {
                    SalesRequestResponse response = modelMapper.map(product, SalesRequestResponse.class);
                    response.setMemberNickName(product.getMember().getMemberNickName()); // memberNickName 설정
                    response.setBuyerNickName(
                            orderRepository.findByOrderStateInAndProduct(
                                            Arrays.asList(OrderState.COMPLETED, OrderState.SHIPPING, OrderState.DELIVERED), product)
                                    .map(order -> memberRepository.findByMemberEmail(order.getOrderMemberEmail())
                                            .map(Member::getMemberNickName) // 닉네임 가져오기
                                            .orElse(null)) // 멤버가 없으면 null 반환
                                    .orElse(null)
                    );

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
