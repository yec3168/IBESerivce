package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.PayResult;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
public class PointPayBackListResponse {
    private String pointPayBackId;          //uuid
    private String memberEmail;             //회원 이메일
    private String memberName;              //회원 이름
    private Long pointPayBackPoint;         //환급포인트
    private Integer pointPayBackPrice;      //환급금액
    private PayResult pointPayBackResult;   //환급결과
    private String bank;                    //은행코드
    private String bankName;                //은행이름
    private String bankAccountNumber;       //계좌
    private LocalDateTime entryDate;        //생성일
}
