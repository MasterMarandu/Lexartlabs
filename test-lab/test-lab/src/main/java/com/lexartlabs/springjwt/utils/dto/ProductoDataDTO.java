package com.lexartlabs.springjwt.utils.dto;

public class ProductoDataDTO {
    private Double price;
    private String color;

    public ProductoDataDTO(Long id, Double price2, String color2) {
        this.price = price2;
        this.color = color2;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
