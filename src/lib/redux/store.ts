import { configureStore } from '@reduxjs/toolkit';
import  counter  from '@/lib/features/counter/counterSlice';
import { ProductApi } from './service/productApi';

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter,
            [ProductApi.reducerPath]: ProductApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(ProductApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']