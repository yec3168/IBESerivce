package com.project.ibe.dto.member;

import com.project.ibe.entity.common.SocialType;
import lombok.Builder;
import lombok.Data;

@Data
public class KakaoSignupCheckResponse {
    private String memberEmail;
    private String memberNickName;
    private String memberSocialId;
    private SocialType memberSocialType;

    @Builder
    public KakaoSignupCheckResponse(String memberEmail, String memberNickName, String memberSocialId, SocialType memberSocialType){
        this.memberEmail =memberEmail;
        this.memberNickName = memberNickName;
        this.memberSocialId = memberSocialId;
        this.memberSocialType = memberSocialType;

    }
}
