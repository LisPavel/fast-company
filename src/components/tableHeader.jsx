import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (item === selectedSort.iter) {
      return onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    }
    onSort({ iter: item, order: "asc" });
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((col) => (
          <th
            onClick={
              columns[col].iter
                ? () => handleSort(columns[col].iter)
                : undefined
            }
            scope="col"
            key={col}
            {...{ role: columns[col].iter && "button" }}
          >
            {columns[col].name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};
export default TableHeader;
