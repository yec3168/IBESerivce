package com.project.ibe.dto.mypage;

import com.project.ibe.entity.common.Bank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberInfoUpdateRequest {
    private String memberName;
    private String memberNickName;
    private String memberPhone;
    private String memberAddr;
    private String memberAddrDetail;
    private String memberAccountNumber;
    private Bank memberBank;
}