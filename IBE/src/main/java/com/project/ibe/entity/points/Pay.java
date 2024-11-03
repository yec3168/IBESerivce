package com.project.ibe.entity.points;

import com.project.ibe.entity.common.PayResult;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
@Getter @Setter
@Table(name = "pay")
public class Pay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payId;
    private String memberEmail;             //회원 이메일
    private String payName;                 //상품명
    private Long payPoint;                //충전포인트
    private Integer pay_price;              //결제금액
    private Integer tax_free_amount;        //상품비과세금액
    private String partnerOrderId;          //결제고유번호
    @Enumerated(EnumType.STRING)
    private PayResult payResult;            //결제결과
    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime entryDate;
}
