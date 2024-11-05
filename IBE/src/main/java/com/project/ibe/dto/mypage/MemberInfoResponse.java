package com.project.ibe.dto.mypage;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberInfoResponse {
    private String memberName;
    private String memberEmail;
    private String memberNickName;
    private Long memberPoint;
}
