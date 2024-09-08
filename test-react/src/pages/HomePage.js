import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container text-center my-5">
            <h1 className="mb-4">Bienvenido a la gestión de productos</h1>
            <p className="lead">Desde aquí puedes gestionar tus productos.</p>

            <div className="d-flex justify-content-center mt-4">
                <Link to="/products" className="me-3">
                    <button className="btn btn-primary">Ver Productos</button>
                </Link>

                <Link to="/add-product">
                    <button className="btn btn-success">Agregar Producto</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
