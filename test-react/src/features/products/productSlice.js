import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  id:null,
  error: null,
  isLoading: false,
  selectedProduct: null,
  successMessage: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

    fetchProducts(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchProductsSuccess(state, action) {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchProductsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    addProduct(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    addProductSuccess(state, action) {
      state.items.push(action.payload);
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Producto agregado exitosamente';
    },
    addProductFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateProduct(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateProductSuccess(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Producto actualizado exitosamente';
    },
    updateProductFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchProductById(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchProductByIdSuccess(state, action) {
      state.selectedProduct = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchProductByIdFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    deleteProduct(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
  
    deleteProductSuccess(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Producto eliminado exitosamente';
    },
    deleteProductFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  fetchProductById,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} = productSlice.actions;

export default productSlice.reducer;