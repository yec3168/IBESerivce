package com.project.ibe.dto;

import lombok.Data;

@Data
public class MemberSignInRequest {

    private String memberEmail;
    private String memberPassword;

}
