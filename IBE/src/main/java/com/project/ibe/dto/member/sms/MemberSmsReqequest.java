package com.project.ibe.dto.member.sms;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 *  아이디 찾기시 이름과 전화번호를 받을 RequestDTO
 */
@Data
public class MemberSmsReqequest {
    @Size(min = 2, max = 11)
    @NotBlank(message = "이름은 필수입력값입니다.")
    private String memberName;

    @NotBlank(message = "핸드폰번호는 필수입력값입니다.")
    private String memberPhone;
}
