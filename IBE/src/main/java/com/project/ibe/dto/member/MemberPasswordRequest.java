package com.project.ibe.dto.member;

import lombok.Data;

@Data
public class MemberPasswordRequest {
    private String memberEmail;
    private String memberPassword;
}
