package com.project.ibe.entity.common;

public enum Category {
    KIDS_CLOTHING("아동 의류"),
    KIDS_TOYS("아동 완구"),
    KIDS_BOOKS("아동 도서"),
    OUTDOOR_SUPPLIES("외출 용품"),
    MISC("기타");

    private final String description;

    Category(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    //System.out.println(Category.KIDS_CLOTHING.getDescription()); // 출력: 아동 의류
}
