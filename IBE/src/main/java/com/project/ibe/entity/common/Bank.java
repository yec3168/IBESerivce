package com.project.ibe.entity.common;


public enum Bank {
    KB("국민은행"),
    SHINHAN("신한은행"),
    HANA("하나은행"),
    WOORI("우리은행"),
    NH("농협은행"),
    KAKAO("카카오뱅크"),
    TOSS("토스뱅크");

    private final String description;

    Bank(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}