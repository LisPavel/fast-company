import React from "react";

const Quality = (props) => {
  const classes = `badge bg-${props.color} m-1`;

  return <span className={classes}>{props.name}</span>;
};

export default Quality;
