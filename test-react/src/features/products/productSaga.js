import { call, put, takeLatest } from 'redux-saga/effects';
import {  fetchProductsSuccess, fetchProductsFailure, addProductSuccess, addProductFailure, deleteProductSuccess, updateProductSuccess,updateProductFailure, deleteProductFailure, fetchProductByIdSuccess, fetchProductByIdFailure  } from './productSlice';
import { fetchProducts as fetchProductsApi, addProductApi, updateProductApi, deleteProductApi, fetchProductByIdApi } from '../../services/api';


function* fetchProductsSaga() {
    try {
        const response = yield call(fetchProductsApi);
        yield put(fetchProductsSuccess(response)); 
    } catch (error) {
        yield put(fetchProductsFailure(error.message));
    }
}

function* addProductSaga(action) {
    try {
      const response = yield call(addProductApi, action.payload);
      yield put(addProductSuccess(response.data));
    } catch (error) {
      yield put(addProductFailure(error.message));  // Maneja errores
    }
  }
  
  function* updateProductSaga(action) {
    try {
      const response = yield call(updateProductApi, action.payload);
      yield put(updateProductSuccess(response.data));   
    } catch (error) {
      yield put(updateProductFailure(error.message)); 
    }
  }
  
  function* deleteProductSaga(action) {
    try {
      const response = yield call(deleteProductApi, action.payload);
      yield put(deleteProductSuccess(response));  
    } catch (error) {
      yield put(deleteProductFailure(error.message));  // Maneja errores
    }
  }

  function* handleFetchProductById(action) {
    try {
      const response = yield call(fetchProductByIdApi, action.payload);
      yield put(fetchProductByIdSuccess(response.data));
    } catch (error) {
      yield put(fetchProductByIdFailure(error.message));
    }
  }

export default function* productSaga() {
    yield takeLatest('products/fetchProducts', fetchProductsSaga);
    yield takeLatest('products/addProduct', addProductSaga);
    yield takeLatest('products/updateProduct', updateProductSaga);
    yield takeLatest('products/deleteProduct', deleteProductSaga);
    yield takeLatest('products/fetchProductById', handleFetchProductById);
  }