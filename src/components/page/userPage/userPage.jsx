import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import userApi from "../../../api/fake.api/user.api";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(
    () =>
      userApi.getById(id).then((result) => {
        setUser(result);
      }),
    []
  );

  const handleBackClick = () => {
    history.goBack();
  };

  const renderUser = (data) => {
    if (!data) return <h3> Loading... </h3>;
    return (
      <div className="card border-top-0 border-bottom-0">
        <div className="card-header ps-0">
          <button className="btn btn-link" onClick={handleBackClick}>
            <i className="bi bi-chevron-left" />
          </button>
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <h6 className="card-subtitle">{_.get(data, "profession.name")}</h6>
          </div>
        </div>
        <table className="table table-striped m-0">
          <tbody>
            <tr>
              <th scope="row">Qualities</th>
              <td>
                <Qualities qualities={data.qualities} />
              </td>
            </tr>
            <tr>
              <th scope="row">Completed meetings</th>
              <td>{data.completedMeetings}</td>
            </tr>
            <tr>
              <th scope="row">Rate </th>
              <td>{data.rate}</td>
            </tr>
            <tr>
              <th scope="row">Bookmarked</th>
              <td>{data.bookmark ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  return <>{renderUser(user)}</>;
};

export default UserPage;
