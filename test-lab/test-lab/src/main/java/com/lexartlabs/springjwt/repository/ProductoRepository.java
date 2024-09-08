package com.lexartlabs.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lexartlabs.springjwt.models.Producto;


@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}

