package com.project.ibe.dto.points;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class KakaoPayResponse {
    private String memberName;
    private Long memberPoint;
    private Long chargePoint;
    private Long amount;
}
