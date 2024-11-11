package com.project.ibe.controller;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.order.*;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public Response saveOrders(@RequestBody OrderFormRequest orderFormRequest,
                               @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, orderService.saveOrders(orderFormRequest, principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @GetMapping
    // 마이페이지 구매목록
    public Response orderList(@AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, orderService.getOrderList(principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @GetMapping("/sell")
    // 마이페이지 판매목록
    public Response sellList(@AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, orderService.getSellList(principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PostMapping("/complete")
    public Response orderComplete(@RequestBody OrderCompleteRequest orderCompleteRequest,
                                  @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, orderService.orderComplete(orderCompleteRequest, principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PostMapping("/delivery")
    public Response orderDelivery(@RequestBody OrderDeliveryRequest orderCompleteRequest,
                                  @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, orderService.orderDelivery(orderCompleteRequest, principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PostMapping("/finish")
    public Response orderFinished(@RequestBody OrderFinishedRequest orderFinishedRequest,
                                  @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, orderService.orderFinished(orderFinishedRequest, principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PostMapping("/reject")
    public Response orderRejected(@RequestBody OrderRejectedRequest orderRejectedRequest,
                                  @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, orderService.rejectedOrder(orderRejectedRequest, principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }
}
