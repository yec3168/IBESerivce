package com.project.ibe.entity.common;

public enum BoardCategory {
    NOTICE("공지"),
    REQUEST("요청"),
    QUESTION("질문"),
    INFORMATION("정보"),
    GENERAL("일반");

    private final String description;

    BoardCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
    @Override
    public String toString() {
        return description;
    }
}
