import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true
      state.error = null
    },
    authSuccess(state, action) {
      state.loading = false
      state.isLoggedIn = true
      state.user = action.payload
    },
    authFailure(state, action) {
      state.loading = false
      state.error = action.payload
      state.isLoggedIn = false
      state.user = null
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
      state.error = null
      state.loading = false
    },
    clearError(state) {
      state.error = null
    }
  }
})

export const { authStart, authSuccess, authFailure, logout, clearError } =
  authSlice.actions

export default authSlice.reducer
