package com.project.ibe.dto.points;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoReadyRequest {
    private String priceName;
    private int totalPrice;
}
