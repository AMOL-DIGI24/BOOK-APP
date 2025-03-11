import { createAsyncThunk } from "@reduxjs/toolkit";
import booksServices from "../../services/books/books.service";


// Get Books List Action
 const getBooksListAction = createAsyncThunk(
    "bookSlice/getBooksListAction",
    async (_, { rejectWithValue }) => {
      try {
        const response = await booksServices.getBooksListServices();
        return response; 
      } catch (error: unknown) {
        return rejectWithValue(error || "Failed to fetch books");
      }
    }
  );
  
  

  // Exports all the Books Actions Here

  export const booksProjectActions = {
    getBooksListAction
  }

