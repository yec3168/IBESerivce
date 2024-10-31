package com.project.ibe.dto.member;

import com.project.ibe.entity.common.Bank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;

@Data
public class MemberSignUpRequest {
    @Email
    @NotBlank(message = "이메일은 필수입력값입니다.")
    private String memberEmail;

    @Size(min = 6, max = 20)
    @NotBlank(message = "비밀번호는 필수입력값입니다.")
    private String memberPassword;

    @Size(min = 2, max = 11)
    @NotBlank(message = "이름은 필수입력값입니다.")
    private String memberName;

    @Size(min = 2, max = 11)
    @NotBlank(message = "닉네임은 필수입력값입니다.")
    private String memberNickName;

//    private Date memberBirth;
    @NotBlank(message = "주소는 필수입력값입니다.")
    private String memberAddr;
    @NotBlank(message = "상세주소는 필수입력값입니다.")
    private String memberAddrDetail;
    @NotBlank(message = "핸드폰번호는 필수입력값입니다.")
    private String memberPhone;
    @NotBlank(message = "은행은 필수입력값입니다.")
    private Bank memberBank;
    @NotBlank(message = "계좌번호는 필수입력값입니다.")
    private String memberAccountNumber;
}
