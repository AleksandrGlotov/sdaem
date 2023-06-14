import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import newsReducer from './newsSlice'
import authReducer from './authSlice'
import catalogReducer from './catalogSlice'

const store = configureStore({
  reducer: {
    newsPage: newsReducer,
    authPage: authReducer,
    catalogPage: catalogReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export default store