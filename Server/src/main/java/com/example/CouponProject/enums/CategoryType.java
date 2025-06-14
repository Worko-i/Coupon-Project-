package com.example.CouponProject.enums;

public enum CategoryType {
    FOOD("Food"),
    ELECTRONICS("Electronics"), 
    RESTAURANTS("Restaurants"),
    TRAVEL("Travel"),
    ENTERTAINMENT("Entertainment"),
    CLOTHING("Clothing");

    private final String displayName;

    CategoryType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
