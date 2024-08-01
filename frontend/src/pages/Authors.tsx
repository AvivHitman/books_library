import { useEffect } from "react";
import { FormDialog } from "../components/formDialog/FormDialog";
import { DataTable } from "../components/table/Table";
import { selectAuthors, selectFetchAuthorsStatus } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchStatus } from "../types";
import { fetchAuthors } from "../store/authorSlice";
import { useFormDialog } from "../components/hooks/useFormDialog";
import { CircularProgress } from "@mui/material";
import { useAuthorPage } from "../components/hooks/useAuthorPage";
import Search from "../components/search/Search";

export const Authors = () => {
    const dispatch = useAppDispatch();
    const authors = useAppSelector(selectAuthors);
    const loadingStatus = useAppSelector(selectFetchAuthorsStatus);
    const { defaultInputValuesAuthor, authorValidationSchema, addAuthorFields } = useFormDialog();
    const { authorsToDisplayRows, handleSearch, handleUpdateAuthorActive, handleAddAuthor, coulmns } = useAuthorPage(authors);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);


    return (
        <div style={{ marginTop: "70px" }}>
            <FormDialog formTitle={"+ Add new author"}
                onSubmitClick={handleAddAuthor}
                fields={addAuthorFields}
                defaultInputValues={defaultInputValuesAuthor}
                validationSchema={authorValidationSchema} />

            <Search label="Search by name" onChange={handleSearch} />

            {loadingStatus === fetchStatus.LOADING && <CircularProgress />}
            <DataTable onSwitchChanged={handleUpdateAuthorActive} columns={coulmns} rows={authorsToDisplayRows} />
        </div>
    )
}