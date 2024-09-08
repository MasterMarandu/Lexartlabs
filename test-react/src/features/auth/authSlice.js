import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  error: null, 
  isAuthenticated: false,
  isLoading: false
};

// Create the auth slice using createSlice
const authSlice = createSlice({
  name: 'auth', 
  initialState, 
  reducers: {
    loginUser(state, action) {
      state.isLoading = true;
    },

    loginUserSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
      state.isLoading= false;
      state.isAuthenticated = true;
    },

    loginUserFailure(state, action) {
      state.user = null;
      state.error = action.payload;
      state.isLoading= false;
      state.isAuthenticated = false;
    },
  },
});

// Export the reducer functions as actions
export const { 
  loginUser, 
  loginUserSuccess, 
  loginUserFailure 
} = authSlice.actions;

export default authSlice.reducer;