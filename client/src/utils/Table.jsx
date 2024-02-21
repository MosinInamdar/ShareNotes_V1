import React, {useMemo} from "react";
import {useTable} from "react-table";
import "./Table.css";
const Table = ({data}) => {
    const columns = useMemo(() => [
        {Header: "ID", accessor: "id"},
        { Header: "First Name", accessor: "first_name" },
        { Header: "Last Name", accessor: "last_name" },
        { Header: "Email", accessor: "email" },
        { Header: "Phone", accessor: "phone" },
        { Header: "State", accessor: "state" },
        { Header: "City", accessor: "city" },
        { Header: "Address", accessor: "address"}
    ],[]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data});

    return(
        <div className="table-container">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="table-headings">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;