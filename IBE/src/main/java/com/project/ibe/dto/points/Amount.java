package com.project.ibe.dto.points;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Amount {
    private Integer total;
    private Integer tax_free;
    private Integer vat;
    private Integer point;
    private Integer discount;
    private Integer green_deposit;
}
/*
total	Integer	전체 결제 금액
tax_free	Integer	비과세 금액
vat	Integer	부가세 금액
point	Integer	사용한 포인트 금액
discount	Integer	할인 금액
green_deposit	Integer	컵 보증금
 */