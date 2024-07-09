import booksReducer from "./booksSlice";
import authorsReducer from "./authorSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  booksReducer,
  authorsReducer
});
const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectBooks = (state: RootState) => state.booksReducer.books
export const selectFetchBookStatus = (state: RootState) => state.booksReducer.fetchStatus;

export const selectAuthors = (state: RootState) => state.authorsReducer.authors;
export const selectFetchAuthorsStatus = (state: RootState) => state.authorsReducer.fetchStatus;
