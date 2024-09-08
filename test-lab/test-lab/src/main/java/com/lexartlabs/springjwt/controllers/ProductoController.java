package com.lexartlabs.springjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.lexartlabs.springjwt.models.Producto;
import com.lexartlabs.springjwt.security.services.ProductoService;
import com.lexartlabs.springjwt.utils.dto.ProductoDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @PostMapping("/add")
    public ResponseEntity<ProductoDTO> crearProducto(@RequestBody ProductoDTO productoDTO) {
        productoService.crearProducto(productoDTO);
        return ResponseEntity.ok(productoDTO);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ProductoDTO>> obtenerTodosLosProductos() {
        List<ProductoDTO> productos = productoService.obtenerTodosLosProductos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerProductoPorId(@PathVariable Long id) {
        Optional<ProductoDTO> productoDTO = productoService.obtenerProductoPorId(id);
        return productoDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(@PathVariable Long id, @RequestBody ProductoDTO producto) {
        Producto productoActualizado = productoService.actualizarProducto(id, producto);
        return ResponseEntity.ok(productoService.convertirAProductoDTO(productoActualizado));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.ok(id);
    }
}
