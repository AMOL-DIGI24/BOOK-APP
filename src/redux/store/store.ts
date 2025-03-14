import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import booksProjectSlice  from "../books/books.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer : {
        book : booksProjectSlice
    }
})
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void > = ThunkAction<ReturnType,RootState,unknown,Action<string>>

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector : TypedUseSelectorHook<RootState> =useSelector;
