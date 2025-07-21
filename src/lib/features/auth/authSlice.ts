import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.loading = false
      state.isLoggedIn = true
      state.user = action.payload
    },
    loginFailure(state, action) {
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

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  loginSlice.actions

export default loginSlice.reducer
