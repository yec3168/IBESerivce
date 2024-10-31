package com.project.ibe.dto.member.sms;

import lombok.Builder;
import lombok.Data;

@Data
public class MemberSmsResponse {
    private String memberEmail;
    private String memberName;
    private String randomCode;

    @Builder
    public MemberSmsResponse(String memberEmail, String memberName, String randomCode){
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.randomCode = randomCode;
    }

}
