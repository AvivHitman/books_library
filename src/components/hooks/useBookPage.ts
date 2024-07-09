import { useState } from "react";
import { Author, Book } from "../../types";
import { useAppDispatch } from "../../store/hooks";
import { addBook, updateBook } from "../../store/booksSlice";
import { updateAuthor } from "../../store/authorSlice";

export const useBookPage = (books: Book[], authors: Author[]) => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState("");

    const getBooksBySearchValue = (books: Book[], searchValue: string) => {
        return searchValue ? books.filter(
            (book) => book.title.toLowerCase().includes(searchValue.toLowerCase())) : books;
    };

    const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    };

    const handleAddBook = async (book: any) => {
        const addedBook = await dispatch(addBook({ ...book, isActive: false })).unwrap();
        const author = authors.find(author => author.name === book.authorName);
        if (author) {
            dispatch(updateAuthor({ ...author, booksList: [...author.booksList, addedBook] }));
        }
    }

    const handleUpdateBookActive = (book: Book) => {
        dispatch(updateBook(book));
    }

    const booksToDisplay = getBooksBySearchValue(books, searchValue);

    return { booksToDisplay, handleSearch, handleAddBook, handleUpdateBookActive };
}
