import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Productos</h2>
      <ul className="list-group">
        {products.map(product => (
          <li key={product.id} className="list-group-item">
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
