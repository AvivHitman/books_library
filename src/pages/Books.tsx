import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Card } from "../components/card/Card";
import { FormDialog } from "../components/formDialog/FormDialog";
import { selectFetchBookStatus, selectBooks, selectAuthors } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBooks } from "../store/booksSlice";
import { Book, fetchStatus } from "../types";
import { useFormDialog } from "../components/hooks/useFormDialog";
import { fetchAuthors } from "../store/authorSlice";
import Search from "../components/search/Search";
import { useBookPage } from "../components/hooks/useBookPage";


export const Books = () => {
    const dispatch = useAppDispatch();
    const books = useAppSelector(selectBooks);
    const authors = useAppSelector(selectAuthors);
    const loadingStatus = useAppSelector(selectFetchBookStatus);
    const { defaultInputValuesBook, bookValidationSchema, addBookFields } = useFormDialog();
    const { booksToDisplay, handleSearch, handleAddBook, handleUpdateBookActive } = useBookPage(books, authors);
    const authorOptions = authors.map(author => author.name);

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchAuthors());
    }, [dispatch]);

    return (
        <div style={{ marginTop: "70px" }}>
            <FormDialog defaultInputValues={defaultInputValuesBook}
                formTitle={"+ Add new book"}
                onSubmitClick={handleAddBook}
                fields={addBookFields(authorOptions)}
                validationSchema={bookValidationSchema} />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Search label="Search by book title" onChange={handleSearch} />

                {loadingStatus === fetchStatus.LOADING ? <CircularProgress /> :
                    (booksToDisplay.map((book: Book) => {
                        return (
                            <Card key={book.id} onSwitchChanged={handleUpdateBookActive} book={book} />);
                    }))}
            </div>
        </div>

    )
}