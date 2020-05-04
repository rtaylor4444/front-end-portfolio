import React from "react";

// columns : array
// *label : string (for table names)
// *path : string (used to access data dynamically) ex: "title" for movie.title
// sortColumn : object
// *path : string (used with lodash library to access data dynamically (see above))
// (Picks a particaular path based off the array above)
// *order : string 'asc' or 'desc' (determines if lodash will sort asc or decs)
// onSort : function

const raiseSort = obj => {
  const sortColumn = { ...obj.sortColumn };
  if (sortColumn.path === obj.path)
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  else {
    sortColumn.path = obj.path;
    sortColumn.order = "asc";
  }
  obj.onSort(sortColumn);
};

const renderSortIcon = (column, props) => {
  if (column.path !== props.sortColumn.path) return null;
  if (props.sortColumn.order === "asc")
    return <i className="fa fa-sort-up"></i>;
  return <i className="fa fa-sort-down"></i>;
};

const TableHeader = props => {
  return (
    <thead>
      <tr>
        {props.columns.map(column => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() =>
              raiseSort({
                path: column.path,
                sortColumn: props.sortColumn,
                onSort: props.onSort
              })
            }
          >
            {column.label} {renderSortIcon(column, props)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
