import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { items: products = [], isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      dispatch(deleteProduct(id)); // Elimina el producto
    }
  };

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar los productos: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Productos</h2>
      <Link to="/add-product">
        <button className="btn btn-primary mb-3">Agregar Nuevo Producto</button>
      </Link>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item">
              <h3>{product.name} ({product.brand})</h3>
              <p>Modelo: {product.model}</p>
              {product.data && product.data.length > 0 ? (
                <div>
                  <h5>Detalles:</h5>
                  <ul>
                    {product.data.map((data, index) => (
                      <li key={index}>
                        <p>Precio: ${data.price}</p>
                        <p>Color: {data.color}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No hay detalles disponibles para este producto.</p>
              )}
              <div className="d-flex">
                <Link to={`/edit-product/${product.id}`} className="btn btn-secondary me-2">
                  Editar
                </Link>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductPage;
