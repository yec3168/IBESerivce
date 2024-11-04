package com.project.ibe.dto.product;

import com.project.ibe.entity.member.Member;
import lombok.Data;

@Data
public class ProductOrderResponse {
    private Long productId;
    private String productTitle;    //타이틀
    private Long productPoint;
    private String thumbnail;// 썸네일.

    private Member member;

}
