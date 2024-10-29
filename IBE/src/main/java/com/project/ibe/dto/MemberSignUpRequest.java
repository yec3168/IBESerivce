package com.project.ibe.dto;

import com.project.ibe.entity.common.Bank;
import lombok.Data;

import java.util.Date;

@Data
public class MemberSignUpRequest {
    private String memberEmail;
    private String memberPassword;
    private String memberName;
    private String memberNickName;
    private Date memberBirth;
    private String memberAddr;
    private String memberAddrDetail;
    private String memberPhone;
    private Bank memberBank;
    private String memberAccountNumber;
}
