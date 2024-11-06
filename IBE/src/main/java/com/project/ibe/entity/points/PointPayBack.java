package com.project.ibe.entity.points;

import com.project.ibe.entity.common.Bank;
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
@Table(name = "point_pay_back")
public class PointPayBack {
    @Id
    private String pointPayBackId;          //uuid
    private String memberEmail;             //회원 이메일
    private String memberName;              //회원 이름
    private Long pointPayBackPoint;         //환급포인트
    private Integer pointPayBackPrice;      //환급금액
    @Enumerated(EnumType.STRING)
    private PayResult pointPayBackResult;   //환급결과
    private String bank;                    //은행코드
    private String bankName;                //은행이름
    private String bankAccountNumber;       //계좌
    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime entryDate;        //생성일
}
