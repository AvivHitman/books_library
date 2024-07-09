import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ChangeEvent, useState } from "react";
import { Author, AuthorTableRow, TableColumn } from "../../types";
import { Switch } from "@mui/material";

interface IProps {
    columns: TableColumn[];
    rows: AuthorTableRow[];
    onSwitchChanged: (authorId: string, isActive: boolean) => void;
}

export const DataTable = ({ columns, rows, onSwitchChanged }: IProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    sx={{ fontWeight: "bold", fontSize: "14px" }}
                                    key={column.id}
                                    align="left">
                                    {column.label}
                                </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        hover
                                        key={i}
                                    >
                                        {columns.map((column) => {
                                            let value = row[column.id as keyof Author];
                                            if (typeof value === "boolean") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align="left">
                                                        <Switch checked={row.isActive} onChange={() => onSwitchChanged(row.id, !row.isActive)} />
                                                    </TableCell>);
                                            } else if (column.label === "picture") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align="left">
                                                        <img style={{ width: "45px", borderRadius: "45%" }} src={value.toString()} alt="" />
                                                    </TableCell>)
                                            }
                                            if (Array.isArray(value)) {
                                                value = value.join(",");
                                            }
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align="left">
                                                    {value}
                                                </TableCell>)
                                        })}
                                    </TableRow>)
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};