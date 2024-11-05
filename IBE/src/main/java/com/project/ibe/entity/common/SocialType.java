package com.project.ibe.entity.common;

public enum SocialType {
    LOCAL("일반"),
    KAKAO("카카오");

    private final String description;

    SocialType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
