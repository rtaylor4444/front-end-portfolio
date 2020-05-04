import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

//Destructuring arguments to make code clean
const Table = ({ columns, sortColumn, onSort, data, idPath }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} idPath={idPath} />
    </table>
  );
};

export default Table;
