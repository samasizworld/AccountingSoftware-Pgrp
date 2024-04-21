import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authSlice } from "./features/authSlice";
import { ledgerHeadTypeReducer } from "./features/ledgerHeadSlice";

export const store = configureStore({
    reducer: { auth: authSlice.reducer, ledger: ledgerHeadTypeReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;