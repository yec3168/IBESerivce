package com.project.ibe.services.order;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.order.*;
import com.project.ibe.dto.product.ProductDetailResponse;
import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.common.ProductTradeState;
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

import java.time.LocalDateTime;
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

        // 이미 거래완료면 구매 못하게 막음
        if(product.getProductTradeState().equals(ProductTradeState.TRADE_COMPLETED))
            throw new BusinessException("이미 거래완료된 상품입니다.", HttpStatus.BAD_REQUEST);

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
            orderListResponse.setOrderDeliveryDate(order.getOrderDeliveryDate());
            orderListResponse.setProductId(productDetailResponse.getProductId());
            orderListResponse.setProductTitle(productDetailResponse.getProductTitle()); // 물품 제목
            orderListResponse.setProductPoint(productDetailResponse.getProductPoint()); //물품 포인트
            orderListResponse.setMember(productDetailResponse.getMember());             //판매자 정보.
            if(!productDetailResponse.getImagePath().isEmpty())
                orderListResponse.setImagePath(productDetailResponse.getImagePath().get(0)); //썸네일.
            orderListResponse.setOrderWayBill(order.getOrderWayBill());

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
                sellerListResponse.setProductId(productDetailResponse.getProductId());
                sellerListResponse.setProductTitle(productDetailResponse.getProductTitle());
                sellerListResponse.setProductPoint(productDetailResponse.getProductPoint());
                sellerListResponse.setSellerMemberNickName(sellMember.getMemberNickName());
                if(!productDetailResponse.getImagePath().isEmpty())
                    sellerListResponse.setImagePath(productDetailResponse.getImagePath().get(0));
                sellerListResponse.setProductListedAt(productDetailResponse.getProductCreatedAt());
                sellerListResponseList.add(sellerListResponse);
            }

            for(Order order : orderList){
                if(!order.getOrderState().equals(OrderState.REJECTED)){
                    SellerListResponse sellerListResponse = new SellerListResponse();
                    sellerListResponse.setOrderId(order.getOrderId());
                    sellerListResponse.setOrderState(order.getOrderState());
                    sellerListResponse.setOrderDate(order.getOrderDate());
                    sellerListResponse.setOrderMember(memberService.getMemberByEmail(order.getOrderMemberEmail()));
//                    sellerListResponse.setOrderMemberNickName(memberService.getMemberByEmail(order.getOrderMemberEmail()).getMemberNickName()); //구매자의 닉네임.
                    sellerListResponse.setOrderDeliveryDate(order.getOrderDeliveryDate());
                    sellerListResponse.setProductId(productDetailResponse.getProductId());
                    sellerListResponse.setProductTitle(productDetailResponse.getProductTitle());
                    sellerListResponse.setProductPoint(productDetailResponse.getProductPoint());
                    sellerListResponse.setSellerMemberNickName(sellMember.getMemberNickName());
                    if(!productDetailResponse.getImagePath().isEmpty())
                        sellerListResponse.setImagePath(productDetailResponse.getImagePath().get(0));
                    sellerListResponse.setProductListedAt(productDetailResponse.getProductCreatedAt());
                    sellerListResponse.setOrderWayBill(order.getOrderWayBill());

                    sellerListResponseList.add(sellerListResponse);
                }
            }
        }
        return sellerListResponseList;
    }

    /**
     * 거래완료
     */

    public boolean orderComplete(OrderCompleteRequest orderCompleteRequest, PrincipalDTO principalDTO){
        // 판매자가 존재하는지.
        Member sellMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 물품 확인
        Product sellProduct = productService.findProductById(orderCompleteRequest.getProductId());

        // 구매확정 누른사람이 로그인한 사람과 물품 판매한사람과 일치하는지.
        if(!sellMember.equals(sellProduct.getMember()))
            throw new BusinessException("판매자가 아닙니다.\n 다시 시도해주세요.", HttpStatus.BAD_REQUEST);


        // 주문번호 확인
//        Order order = findOrderById(orderCompleteRequest.getOrderId());
//        order.setOrderState(OrderState.COMPLETED);

        // 다른 주문들은 REJECTED로 변경. 거래신청한 주문번호만 complete
        List<Order> orderList = orderRepository.findAllByProductOrderByOrderIdDesc(sellProduct);
        for(Order order: orderList){
            if(order.getOrderId().equals(orderCompleteRequest.getOrderId())){
                // 현재 거래완료 버튼 누른 orderId와 일치
                order.setOrderState(OrderState.COMPLETED);
            }
            else{
                Member rejectMember = memberService.getMemberByEmail(order.getOrderMemberEmail());
                rejectMember.setMemberPoint( rejectMember.getMemberPoint() + sellProduct.getProductPoint());
                memberService.saveMember(rejectMember);
                order.setOrderState(OrderState.REJECTED);
            }
            orderRepository.save(order);
        }

        //물품 구매확정.
        sellProduct.setProductTradeState(ProductTradeState.TRADE_COMPLETED);
        productService.saveProduct(sellProduct);

        return true;
    }


    /**
     *  운송장번호 입력.
     *  1. order 상태 배송중으로 업데이트
     *  2. order 배송지 입력
     */
    public boolean orderDelivery(OrderDeliveryRequest orderDeliveryRequest, PrincipalDTO principalDTO){
        // 로그인한 회원 가져오기.
        Member sellMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 물품 가져오기.
        Product sellProduct = productService.findProductById(orderDeliveryRequest.getProductId());

        // 물품의 판매자와 로그인한 회원이 일치하는지 확인
        if(!sellMember.equals(sellProduct.getMember()))
            throw new BusinessException("판매자가 아닙니다.\n 다시 시도해주세요.", HttpStatus.BAD_REQUEST);


        // 주문정보 가져오기. ( 나머지는 rejected 될 예정이라 한개만 가져와도 됨. 하나만 거래가능일 예정.)
        Order order = findOrderById(orderDeliveryRequest.getOrderId());
        if(!order.getOrderState().equals(OrderState.COMPLETED))
            throw new BusinessException("잘 못된 주문정보 입니다.\n 관리자에게 문의하세요.", HttpStatus.BAD_REQUEST);

        order.setOrderState(OrderState.SHIPPING); //배송중으로 업데이트
        order.setOrderWayBill(orderDeliveryRequest.getOrderWayBill());
//        order.setOrderDeliveryDate(LocalDateTime.now());

        //저장.
        orderRepository.save(order);

        return true;
    }

    /**
     * 구매확정.
     * 1. Order State 배송완료로 업데이트
     * 2. order 배송도착 날짜 업데이트
     */

    public boolean orderFinished(OrderFinishedRequest orderFinishedRequest, PrincipalDTO principalDTO){
        // 로그인한 회원 가져오기.
        Member sellMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 물품 가져오기.
        Product sellProduct = productService.findProductById(orderFinishedRequest.getProductId());

        // 주문정보 가져오기. 예외처리
        // 1. OrderId 같음
        // 2. product도 같음
        // 3. orderMemberName도 같아야함.
        Order order = orderRepository.findByOrderIdAndProductAndOrderMemberEmail(orderFinishedRequest.getOrderId(), sellProduct, sellMember.getMemberEmail());

        Member productMember = sellProduct.getMember();
        productMember.setMemberPoint(productMember.getMemberPoint() +  sellProduct.getProductPoint());
        memberService.saveMember(productMember);


        if(order==null)
            throw new BusinessException("주문정보가 잘못되었습니다.\n관리자에게 문의해주세요.");

        order.setOrderState(OrderState.DELIVERED);
        order.setOrderDeliveryDate(LocalDateTime.now());
        orderRepository.save(order);

        return true;
    }

    /**
     * 구매거부( 구매자가 구매 취소 )
     */
    public Boolean rejectedOrder(OrderRejectedRequest orderRejectedRequest ,PrincipalDTO principalDTO){
        // 구매자
        Member orderMember = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 물품
        Product product = productService.findProductById(orderRejectedRequest.getProductId());

        // 주문
        Order order = findOrderById(orderRejectedRequest.getOrderId());
        order.setOrderState(OrderState.REJECTED);
        orderRepository.save(order);

        // 회원 금액 되돌려주기.
        orderMember.setMemberPoint(orderMember.getMemberPoint() + product.getProductPoint());
        memberService.saveMember(orderMember);

        return true;
    }

    public Order findOrderById(Long orderId){
        return orderRepository.findById(orderId)
                .orElseThrow(
                        () -> new BusinessException("주문내역이 존재하지 않습니다.", HttpStatus.NOT_FOUND)
                );
    }


}
