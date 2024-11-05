package com.project.ibe.dto.member;

import com.project.ibe.entity.common.Bank;
import com.project.ibe.entity.common.SocialType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class KakaoSignupRequest {

    private String memberEmail;

    private String memberPassword;

    private String memberName;

    private String memberNickName;

    private String memberAddr;

    private String memberAddrDetail;

    private String memberPhone;

    private Bank memberBank;

    private String memberAccountNumber;

    private SocialType memberSocialType;

    private String memberSocialId;
}
