import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, onItemSelect, valueProperty, contentProperty }) => {
  return (
    <ul className="list-group">
      {Object.values(items).map((item) => (
        <li className="list-group-item" key={item[valueProperty]}>
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name",
};

GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
};

export default GroupList;
