import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Author } from "../types";
import { fetchStatus } from "../types";

const serverUrl = "http://localhost:8080/authors";

type AuthorsState = {
  fetchStatus: string;
  authors: Author[];
};

const initialState: AuthorsState = {
  fetchStatus: fetchStatus.LOADING,
  authors: [],
};

export const fetchAuthors = createAsyncThunk("authors/fetch", async () => {
  const response = await axios.get(serverUrl);
  return response.data;
});

export const addAuthor = createAsyncThunk(
  "authors/add",
  async (author: Author) => {
    const response = await axios.post(serverUrl, author);
    return response.data;
  }
);

export const updateAuthor = createAsyncThunk(
  "authors/update",
  async (author: Author) => {
    const response = await axios.put(`${serverUrl}/${author.id}`, author);
    return response.data;
  }
);

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.fetchStatus = fetchStatus.LOADING;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        if (!state.authors.length) {
          state.authors = action.payload;
        }
      })
      .addCase(fetchAuthors.rejected, (state) => {
        state.fetchStatus = fetchStatus.FAILED;
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload);
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        state.authors = state.authors?.map((author) =>
          author.id === action.payload.id ? { ...action.payload } : author
        );
      })
  },
});

export default authorsSlice.reducer;