import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import userApi from "../api/fake.api/user.api";
import { useParams } from "react-router-dom";
import _ from "lodash";

const User = () => {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState();
  useEffect(
    () =>
      userApi.getById(id).then((result) => {
        console.log(result);
        setUser(result);
      }),
    []
  );

  const renderUser = (data) => {
    if (!data) return <h3> Loading... </h3>;
    console.log(data);
    return (
      <div>
        <h3>{data.name}</h3>
        <h4>Profession: {_.get(data, "profession.name")}</h4>
        <p>
          Qualities:
          <QualitiesList qualities={data.qualities} />
        </p>
        <p>Completed meetings: {data.completedMeetings}</p>
        <p>Rate: {data.rate}</p>
        <p>Bookmarked: {data.bookmark ? "Yes" : "No"}</p>
      </div>
    );
  };
  return <>{renderUser(user)}</>;
};

export default User;
