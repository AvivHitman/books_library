import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../types";
import { fetchStatus } from "../types";

const serverUrl = "http://localhost:8080/books";

type BooksState = {
  books: Book[];
  fetchStatus: string;
};

const initialState: BooksState = {
  fetchStatus: fetchStatus.LOADING,
  books: [],
};

export const fetchBooks = createAsyncThunk("books/fetch", async () => {
  const response = await axios.get(serverUrl);
  return response.data;
});

export const addBook = createAsyncThunk(
  "books/add",
  async (book: Book) => {
    const response = await axios.post(serverUrl, book);
    return response.data;
  }
);

export const updateBook = createAsyncThunk(
  "books/update",
  async (book: Book) => {
    const response = await axios.put(`${serverUrl}/${book.id}`, book);
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.fetchStatus = fetchStatus.LOADING;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        if (!state.books.length) {
          state.books = action.payload;
        }
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.fetchStatus = fetchStatus.FAILED;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.books = state.books?.map((book) =>
          book.id === action.payload.id ? { ...action.payload } : book
        );
      })
  },
});

export default booksSlice.reducer;