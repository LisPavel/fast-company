import React from "react";
import PropTypes from "prop-types";

const SearchStatus = (props) => {
  const { usersAmount = 0 } = props;

  const classes = `badge bg-${usersAmount > 0 ? "primary" : "danger"}`;

  const formatPersonsTxt = () => {
    return `человек${usersAmount >= 2 && usersAmount <= 4 ? "а" : ""}`;
  };

  const getTitleText = () => {
    return usersAmount > 0
      ? `${usersAmount} ${formatPersonsTxt()} тусанет с тобой сегодня`
      : "Никто с тобой не тусанет";
  };

  return (
    <h2>
      <span className={classes}>{getTitleText()}</span>
    </h2>
  );
};

SearchStatus.propTypes = {
  usersAmount: PropTypes.number,
};

export default SearchStatus;
