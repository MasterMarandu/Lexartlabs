package com.lexartlabs.springjwt.utils.dto;

import java.util.List;

public class ProductoDTO {
    private Long id;
    private String name;
    private String brand;
    private String model;
    private List<ProductoDataDTO> data;

    public ProductoDTO(Long id, String name2, String brand2, String model2, List<ProductoDataDTO> dataDTOs) {
        this.id = id;
        this.name = name2;
        this.brand = brand2;
        this.model = model2;
        this.data = dataDTOs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<ProductoDataDTO> getData() {
        return data;
    }

    public void setData(List<ProductoDataDTO> data) {
        this.data = data;
    }
}
