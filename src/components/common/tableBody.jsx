import React from "react";
import _ from "lodash";

// data : array (whatever we are trying to render)
// columns : array
// *label : string (for table names)
// *path : string (used to access data dynamically) ex: "title" for movie.title

const renderCell = (item, column) => {
  if (column.content) return column.content(item);
  //Lodash .get() method is used to extract data from nested properties ex. genre.name
  return _.get(item, column.path);
};

const createKey = (item, column, idPath) => {
  return _.get(item, idPath) + (column.path || column.key);
};

const TableBody = ({ data, columns, idPath }) => {
  return (
    <tbody>
      {data.map(item => (
        <tr key={_.get(item, idPath)}>
          {columns.map(column => (
            <td key={createKey(item, column, idPath)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
