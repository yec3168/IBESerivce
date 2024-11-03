package com.project.ibe.entity.common;

public enum ProductTradeState {
    TRADING_AVAILABLE("거래 가능"),
    TRADE_COMPLETED("거래 완료");

    private final String description;

    ProductTradeState(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}