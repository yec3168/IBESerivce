package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.BuyRequestResponse;
import com.project.ibe.dto.admin.MemberListResponse;
import com.project.ibe.dto.admin.SalesImgResponse;
import com.project.ibe.entity.order.Order;
import com.project.ibe.repository.order.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyRequestService {
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;

    public List<BuyRequestResponse> getOrderList () {
        return orderRepository.findAll().stream()
                .map(entity -> {
                    BuyRequestResponse response = new BuyRequestResponse();
                    response.setOrderDate(entity.getOrderDate());
                    response.setOrderId(entity.getOrderId());
                    response.setOrderState(entity.getOrderState());
                    response.setOrderWayBill(entity.getOrderWayBill());
                    response.setOrderMemberEmail(entity.getOrderMemberEmail());
                    response.setSellerMemberEmail(entity.getSellerMemberEmail());
                    response.setProductId(entity.getProduct().getProductId());
                    response.setOrderDeliveryDate(entity.getOrderDeliveryDate());
                    return response;
                })
                .toList();
    }
}
