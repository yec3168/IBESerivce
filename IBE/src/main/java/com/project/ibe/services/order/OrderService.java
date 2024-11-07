package com.project.ibe.services.order;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.order.OrderFormRequest;
import com.project.ibe.dto.order.OrderFormResponse;
import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.order.Order;
import com.project.ibe.entity.product.Product;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.member.MemberRepository;
import com.project.ibe.repository.order.OrderRepository;
import com.project.ibe.services.member.MemberService;
import com.project.ibe.services.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;


    private final MemberService memberService;
    private final ProductService productService;

    private final ModelMapper modelMapper;

    //주문정보 저장.
    public OrderFormResponse saveOrders(OrderFormRequest orderFormRequest, PrincipalDTO principalDTO){
        //구매자 정보.
        Member orderMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());
        if(orderMember.getMemberPoint() - orderFormRequest.getProductPoint() < 0){
            System.out.println("잔액 부족.");
            throw new BusinessException("잔액이 부족합니다.", HttpStatus.BAD_REQUEST);
        }

        // 판매물품 정보
        Product product = productService.findProductById(orderFormRequest.getProductId());;

        // 중복 주문 확인
        List<Order> orderList = orderRepository.findByProductAndOrderMember(product, orderMember);

        if(!orderList.isEmpty()){
            System.out.println("이미구매");
            throw new BusinessException("이미 구매한 상품입니다.", HttpStatus.BAD_REQUEST);
        }


        // 중복 주문이 없다면, 금액 업데이트
        orderMember.setMemberPoint( orderMember.getMemberPoint() - orderFormRequest.getProductPoint());

        //회원정보 저장.
        Member savedMOrderMember = memberService.saveMember(orderMember);


        //구매정보 저장.
        Order savedOrder = orderRepository.save(Order.builder()
                                .orderState(OrderState.AVAILABLE) // 처음엔 거래가능 -> 판매자가 거래확정 클릭시 update.
                                .orderMember(savedMOrderMember)
                                .product(product)
                                .build());

        return modelMapper.map(savedOrder, OrderFormResponse.class);
    }
}
