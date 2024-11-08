package com.project.ibe.entity.order;

import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.product.Product;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(unique = false)
    @Enumerated(EnumType.STRING)
    private OrderState orderState;

    @Column(unique = false)
    @CreationTimestamp
    private LocalDateTime orderDate; //구매신청시간

    private LocalDateTime orderDeliveryDate; //배송시작시간  -> 따로 서비스에서 .now() 써줘야함.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product; //판매물품 -> 판매자 정보도 들어있음.

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
    private String orderMemberEmail; // 구매자.

    private String sellerMemberEmail; //판매자.


    @Builder
    public Order(OrderState orderState, Product product, String orderMemberEmail, String sellerMemberEmail){
        this.orderState = orderState;
        this.product =product;
        this.orderMemberEmail = orderMemberEmail;
        this.sellerMemberEmail = sellerMemberEmail;
    }
}
