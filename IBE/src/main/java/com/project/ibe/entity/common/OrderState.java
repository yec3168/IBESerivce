package com.project.ibe.entity.common;

public enum OrderState {

    AVAILABLE("거래 가능"),
    COMPLETED("거래 완료"),
    SHIPPING("배송 중"),
    DELIVERED("배송 완료");

    private final String description;

    OrderState(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
