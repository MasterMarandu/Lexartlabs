import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductForm from './components/ProductForm';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path="/add-product" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
        <Route 
          path="/edit-product/:id" 
          element={
            <ProtectedRoute>
              <ProductForm /> 
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
