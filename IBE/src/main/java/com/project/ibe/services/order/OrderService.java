package com.project.ibe.services.order;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.order.OrderFormRequest;
import com.project.ibe.dto.order.OrderFormResponse;
import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.order.Order;
import com.project.ibe.entity.product.Product;
import com.project.ibe.repository.order.OrderRepository;
import com.project.ibe.services.member.MemberService;
import com.project.ibe.services.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final MemberService memberService;
    private final ProductService productService;

    private final ModelMapper modelMapper;

    public OrderFormResponse saveOrders(OrderFormRequest orderFormRequest, PrincipalDTO principalDTO){
        //구매자 정보.
        Member orderMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 판매물품 정보
        Product product = productService.findProductById(orderFormRequest.getProductId());;

        //구매정보 저장.
        Order savedOrder = orderRepository.save(Order.builder()
                                .orderState(OrderState.AVAILABLE) // 처음엔 거래가능 -> 판매자가 거래확정 클릭시 update.
                                .orderMember(orderMember)
                                .product(product)
                                .build());

        return modelMapper.map(savedOrder, OrderFormResponse.class);
    }
}
