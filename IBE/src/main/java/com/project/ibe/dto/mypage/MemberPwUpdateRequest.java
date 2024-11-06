package com.project.ibe.dto.mypage;

import com.project.ibe.entity.common.Bank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPwUpdateRequest {
    private String memberPassword;
    private String memberNewPassword;
}