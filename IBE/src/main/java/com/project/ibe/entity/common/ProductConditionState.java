package com.project.ibe.entity.common;

public enum ProductConditionState {
    HIGH("상"),
    MEDIUM("중"),
    LOW("하");

    private final String description;

    ProductConditionState(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}