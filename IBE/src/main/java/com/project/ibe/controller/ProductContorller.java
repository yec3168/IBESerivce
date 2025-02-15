package com.project.ibe.controller;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.product.ProductCommentRequest;
import com.project.ibe.dto.product.ProductFormRequest;
import com.project.ibe.dto.product.ProductReplyRequest;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.product.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductContorller {

    private final ProductService productService;

    /**
     * 판매 물품 등록.
     */
    @PostMapping
    public Response saveProduct(@RequestPart("productFormRequest")ProductFormRequest productFormRequest,
                                @RequestPart("images")List<MultipartFile> images,
                                @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return  new Response(ResponseCode.SUCCESS, productService.createProduct(productFormRequest, images, principalDTO), "200");
        }catch (Exception e){
            return  new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     * 물품 상세정보 조회
     */
    @GetMapping("/{id}")
    public Response getProductDetail(@PathVariable("id") Long id){
        try{
            return new Response(ResponseCode.SUCCESS, productService.getProductDetail(id), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     * 물품 목록 조회.
     * @return
     */
    @GetMapping
    public Response getProductList(){
        try{
            return new Response(ResponseCode.SUCCESS, productService.getProductList(), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     *  댓글 등록.
     */
    @PostMapping("/comments")
    public Response createProductComment(@Valid @RequestBody ProductCommentRequest productCommentRequest,
                                         @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, productService.createProductComment(productCommentRequest, principalDTO), "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     *  댓글 목록 조회.
     */
    @GetMapping("/comments")
    public Response getProductCommentList(@RequestParam("productId") Long productId){
        System.out.println(productId);
        try{
            return new Response(ResponseCode.SUCCESS, productService.getProductCommentList(productId), "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     *  대댓글 등록.
     */
    @PostMapping("/reply")
    public Response createProductReply(@Valid @RequestBody ProductReplyRequest productReplyRequest,
                                       @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, productService.createProductReply(productReplyRequest, principalDTO), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }


    /**
     * 물품 주문시 필요 정보 조회.
     */
    @GetMapping("/orders/{productId}")
    public Response getProductOrderResponse(@PathVariable("productId")Long productId, @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, productService.getProductOrderResponse(productId, principalDTO), "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }
}

