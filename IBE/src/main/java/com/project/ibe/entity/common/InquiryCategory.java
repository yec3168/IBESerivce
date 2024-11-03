package com.project.ibe.entity.common;

public enum InquiryCategory {
    DELIVERY("배송 지연 / 누락"),
    PRODUCT_DEFECT("물품 하자"),
    POINT_CHARGE("포인트 충전"),
    POINT_PAYBACK("포인트 환급"),
    INQ_MISC("기타");

    private final String description;

    InquiryCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
