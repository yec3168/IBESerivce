package com.project.ibe.entity.product;

import com.project.ibe.entity.common.Category;
import com.project.ibe.entity.common.ProductConditionState;
import com.project.ibe.entity.common.ProductTradeState;
import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
@Getter @Setter
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(nullable = false)
    private String productTitle;

    @Column(nullable = false)
    private String productContent;

    @Column(nullable = false)
    private Long productPoint; // 상품 가격

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductTradeState productTradeState; //거래상태

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductConditionState productConditionState; // 물품상태

    @Column(nullable = false)
    private int productHit; // 조회수

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category productCategory;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime productCreatedAt; // 물품등록 신청 시간.

    private LocalDateTime productListedAt; // 관리자가 판매물품 등록허용 시간

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
