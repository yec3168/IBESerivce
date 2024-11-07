package com.project.ibe.services.order;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.order.OrderFormRequest;
import com.project.ibe.dto.order.OrderFormResponse;
import com.project.ibe.dto.order.OrderListResponse;
import com.project.ibe.dto.order.SellerListResponse;
import com.project.ibe.dto.product.ProductDetailResponse;
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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;


    private final MemberService memberService;
    private final ProductService productService;

    private final ModelMapper modelMapper;

    /**
     * 구매 정보 저장.
     */
    public OrderFormResponse saveOrders(OrderFormRequest orderFormRequest, PrincipalDTO principalDTO){
        //구매자 정보.
        Member orderMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());
        if(orderMember.getMemberPoint() - orderFormRequest.getProductPoint() < 0){
            System.out.println("잔액 부족.");
            throw new BusinessException("잔액이 부족합니다.", HttpStatus.BAD_REQUEST);
        }

        // 판매물품 정보
        Product product = productService.findProductById(orderFormRequest.getProductId());;

        // 판매자정보 == 구매자 정보 확인
        if(product.getMember().equals(orderMember))
            throw new BusinessException("자신의 물품을 구매할 수 없습니다.", HttpStatus.BAD_REQUEST);

        // 중복 주문 확인
        List<Order> orderList = orderRepository.findByProductAndOrderMemberEmail(product, orderMember.getMemberEmail());

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
                                .product(product)
//                                .orderMember(savedMOrderMember)
                                .orderMemberEmail(savedMOrderMember.getMemberEmail()) // 추가.
                                .sellerMemberEmail(product.getMember().getMemberEmail()) //추가.
                                .build());

        return modelMapper.map(savedOrder, OrderFormResponse.class);
    }


    /**
     * 구매목록 조회.
     */
    public List<OrderListResponse> getOrderList(PrincipalDTO principalDTO){
        // 마이페이지 사용자 정보.
        Member orderMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 주문목록 조회 ( 주문조회시 주문번호 내림차순으로 정렬)
        List<Order> orderList = orderRepository.findAllByOrderMemberEmailOrderByOrderIdDesc(orderMember.getMemberEmail());

        List<OrderListResponse> orderListResponseList = new ArrayList<>();
        for(Order order : orderList){
            //물품 정보가져오기.
            ProductDetailResponse productDetailResponse = productService.getProductDetail(order.getProduct().getProductId());

            // 주문정보 저장.
//            OrderListResponse orderListResponse = modelMapper.map(order, OrderListResponse.class);
            OrderListResponse orderListResponse = new OrderListResponse();
            orderListResponse.setOrderId(order.getOrderId());
            orderListResponse.setOrderState(order.getOrderState());
            orderListResponse.setOrderDate(order.getOrderDate());
            orderListResponse.setProductTitle(productDetailResponse.getProductTitle()); // 물품 제목
            orderListResponse.setProductPoint(productDetailResponse.getProductPoint()); //물품 포인트
            orderListResponse.setMember(productDetailResponse.getMember());             //판매자 정보.
            if(!productDetailResponse.getImagePath().isEmpty())
                orderListResponse.setImagePath(productDetailResponse.getImagePath().get(0)); //썸네일.

            orderListResponseList.add(orderListResponse);
        }

        return orderListResponseList;
    }

    /**
     * 판매목록 조회
     */

    public List<SellerListResponse> getSellList(PrincipalDTO principalDTO){
        // 마이페이지 사용자 정보.
        Member sellMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 1. 사용자가 판매한 물품 리스트들을 가져옴.
        List<Product> productList = productService.findAllByMember(sellMember);

        // 결과를 저장할 변수.
        List<SellerListResponse> sellerListResponseList = new ArrayList<>();

        //2. 판매자가 올린 Product 목록을 가져옴.
        for(Product product : productList){
            ProductDetailResponse productDetailResponse = productService.getProductDetail(product.getProductId());

            //판매자 이메일과 일치하는 OrderList 가져옴.
            List<Order> orderList = orderRepository.findAllByProductOrderByOrderIdDesc(product);

            if(orderList.isEmpty()){
                SellerListResponse sellerListResponse = new SellerListResponse();
                sellerListResponse.setOrderState(OrderState.AVAILABLE);
                sellerListResponse.setProductTitle(productDetailResponse.getProductTitle());
                sellerListResponse.setProductPoint(productDetailResponse.getProductPoint());
                sellerListResponse.setSellerMemberNickName(sellMember.getMemberNickName());
                if(!productDetailResponse.getImagePath().isEmpty())
                    sellerListResponse.setImagePath(productDetailResponse.getImagePath().get(0));

                sellerListResponseList.add(sellerListResponse);
            }

            for(Order order : orderList){
                if(!order.getOrderState().equals(OrderState.REJECTED)){
                    SellerListResponse sellerListResponse = new SellerListResponse();
                    sellerListResponse.setOrderId(order.getOrderId());
                    sellerListResponse.setOrderState(order.getOrderState());
                    sellerListResponse.setOrderDate(order.getOrderDate());
                    sellerListResponse.setOrderMemberNickName(memberService.getMemberByEmail(order.getOrderMemberEmail()).getMemberNickName()); //구매자의 닉네임.
                    sellerListResponse.setOrderDeliveryDate(order.getOrderDeliveryDate());
                    sellerListResponse.setProductTitle(productDetailResponse.getProductTitle());
                    sellerListResponse.setProductPoint(productDetailResponse.getProductPoint());
                    sellerListResponse.setSellerMemberNickName(sellMember.getMemberNickName());
                    if(!productDetailResponse.getImagePath().isEmpty())
                        sellerListResponse.setImagePath(productDetailResponse.getImagePath().get(0));


                    sellerListResponseList.add(sellerListResponse);
                }
            }
        }
        return sellerListResponseList;
    }

//    public List<SellerListResponse> getSellList(PrincipalDTO principalDTO){
//        // 마이페이지 사용자 정보.
//        Member orderMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());
//
//        // 1. 사용자가 판매한 물품 리스트들을 가져옴.
//        List<Product> productList = productService.findAllByMember(orderMember);
//
//
//        // 2. 해당 물품과 일치하는 Order 가져옴
//        for(Product product : productList){
//            //2-1. 물품 정보 가져오기.
//            ProductDetailResponse productDetailResponse = productService.getProductDetail(product.getProductId());
//
//            SellerListResponse sellerListResponse = modelMapper.map(productDetailResponse, SellerListResponse.class);
//            if(!productDetailResponse.getImagePath().isEmpty())
//                sellerListResponse.setImagePath(productDetailResponse.getImagePath().get(0));
//
//            // 2-2 해당 물품의 주문 정보가 존재하는지.
//            if(orderRepository.existsByProduct(product)){
//                // 2-2-1. Order 리스트 가져오기
//                List<Order> orderList = orderRepository.findAllByProductOrderByOrderIdDesc(product);
//
//            }
//
//            //2-3. 존재하지 않으면
//        }
//
//        return null;
//    }
}
