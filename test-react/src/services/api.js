import axios from 'axios';

const API_URL = 'http://localhost:8088/api';



export const authenticateUser = async (username, password) => {
    try {
      console.log('username', username);
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'An error occurred during login');
    }
  };

  export const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/productos/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred during the fetch');
    }
  };

  export const addProductApi = async (product) => {
    try {
      const response = await axios.post(`${API_URL}/productos/add`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al agregar producto');
    }
  };
  
 
  export const updateProductApi = async (product) => {
    try {
      const response = await axios.put(`${API_URL}/productos/update/${product.id}`, product.productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al actualizar producto');
    }
  };
  

  export const deleteProductApi = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/productos/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al eliminar producto');
    }
  };

  export const fetchProductByIdApi = async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/productos/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al eliminar producto');
    }
  };

  