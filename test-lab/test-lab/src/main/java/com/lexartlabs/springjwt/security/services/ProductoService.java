package com.lexartlabs.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lexartlabs.springjwt.models.Producto;
import com.lexartlabs.springjwt.models.ProductoData;
import com.lexartlabs.springjwt.repository.ProductoRepository;
import com.lexartlabs.springjwt.utils.dto.ProductoDTO;
import com.lexartlabs.springjwt.utils.dto.ProductoDataDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.xml.crypto.Data;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public Producto crearProducto(ProductoDTO productoDTO) {
        Producto producto = new Producto();
        producto.setName(productoDTO.getName());
        producto.setBrand(productoDTO.getBrand());
        producto.setModel(productoDTO.getModel());

        List<ProductoData> productoDataList = productoDTO.getData().stream()
                .map(dto -> {
                    ProductoData data = new ProductoData();
                    data.setPrice(dto.getPrice());
                    data.setColor(dto.getColor());
                    data.setProducto(producto);
                    return data;
                })
                .toList();

        producto.setData(productoDataList);
        return productoRepository.save(producto);
    }

    public List<ProductoDTO> obtenerTodosLosProductos() {
        List<Producto> productos = productoRepository.findAll();
        return productos.stream().map(this::convertirAProductoDTO).collect(Collectors.toList());
    }

    public Optional<ProductoDTO> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .map(this::convertirAProductoDTO);
    }

    public Producto actualizarProducto(Long id, ProductoDTO productoDTO) {
        Producto producto = convertToEntity(productoDTO);
        return productoRepository.findById(id).map(producto2 -> {
            producto2.setName(productoDTO.getName());
            producto2.setBrand(productoDTO.getBrand());
            producto2.setModel(productoDTO.getModel());
            return productoRepository.save(producto2);
        }).orElseGet(() -> {
            return productoRepository.save(producto);
        });
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    private ProductoData convertToEntity2(ProductoDataDTO dataDTO) {
        ProductoData data = new ProductoData();
        data.setPrice(dataDTO.getPrice());
        data.setColor(dataDTO.getColor());
        return data;
    }

    private Producto convertToEntity(ProductoDTO productoDTO) {
        Producto producto = new Producto();
        producto.setId(productoDTO.getId());
        producto.setName(productoDTO.getName());
        producto.setBrand(productoDTO.getBrand());
        producto.setModel(productoDTO.getModel());

        List<ProductoData> dataEntities = productoDTO.getData().stream()
                .map(this::convertToEntity2)
                .collect(Collectors.toList());
        producto.setData(dataEntities);

        return producto;
    }

    public ProductoDTO convertirAProductoDTO(Producto producto) {
        List<ProductoDataDTO> dataDTOs = producto.getData().stream()
                .map(this::convertirAProductoDataDTO)
                .collect(Collectors.toList());

        return new ProductoDTO(
                producto.getId(),
                producto.getName(),
                producto.getBrand(),
                producto.getModel(),
                dataDTOs);
    }

    private ProductoDataDTO convertirAProductoDataDTO(ProductoData data) {
        return new ProductoDataDTO(
                data.getId(),
                data.getPrice(),
                data.getColor());
    }
}
