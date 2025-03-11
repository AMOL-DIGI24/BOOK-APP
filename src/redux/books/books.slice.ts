import { createSlice } from "@reduxjs/toolkit";
import { booksProjectActions } from "./books.action";


const booksProjectSlice = createSlice({
    name : 'booksProject',
    initialState:{
        booksListData : [] ,
        booksListError : "",
    },
    reducers: {
        booksProjectDetails: (state) => {
            state.booksListData = [];
        }
    },
    extraReducers : (builder) =>{
        builder
        // --------------- cases of books list api data -------------
        .addCase(booksProjectActions.getBooksListAction.pending, (state) =>{
            state.booksListError = "";
            state.booksListData = [];
        })
        .addCase(booksProjectActions.getBooksListAction.fulfilled,(state, action: any) =>{
            state.booksListData = action.payload;
        })
        .addCase(booksProjectActions.getBooksListAction.rejected, (state, action) => {
            state.booksListError = action.error.message || "Failed to fetch books list";
        })
    }
})


export const { booksProjectDetails} = booksProjectSlice.actions;

export default booksProjectSlice.reducer;