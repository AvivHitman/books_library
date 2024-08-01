import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Author } from "../../types";
import { addAuthor, updateAuthor } from "../../store/authorSlice";
import { updateBook } from "../../store/booksSlice";

export const useAuthorPage = (authors: Author[]) => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState("");

    const getAuthorsBySearchValue = (authors: Author[], searchValue: string) => {
        return searchValue ? authors.filter(
            (author) => author.name.toLowerCase().includes(searchValue.toLowerCase())) : authors;
    };

    const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    };

    const handleAddAuthor = (author: any) => {
        dispatch(addAuthor({ ...author, isActive: true }));
    }

    const handleUpdateAuthorActive = (authorId: string, isActive: boolean) => {
        const author = authors.find(author => author.id === authorId);
        if (author) {
            dispatch(updateAuthor({ ...author, isActive: isActive }));
            author.booksList.forEach(book => {
                dispatch(updateBook({ ...book, isActive: isActive }))
            })
        }
    }

    const coulmns = [
        { id: "picture", label: "picture" },
        { id: "name", label: "name" },
        { id: "country", label: "country" },
        { id: "booksList", label: "books list" },
        { id: "isActive", label: "active status" },

    ];

    const authorsToDisplay = getAuthorsBySearchValue(authors, searchValue);
    const authorsToDisplayRows = authorsToDisplay.map((row) => ({ ...row, booksList: row["booksList"]?.map(book => book.title) }))

    return { authorsToDisplayRows, handleSearch, handleUpdateAuthorActive, handleAddAuthor, coulmns }
}
