package com.project.ibe.dto.member;

import lombok.Data;

@Data
public class MemberSignInRequest {

    private String memberEmail;
    private String memberPassword;

}
