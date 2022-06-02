import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import Qualities from "../../ui/qualities";
import userApi from "../../../api/fake.api/user.api";
import { useParams } from "react-router-dom";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
// import _ from "lodash";

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    // const history = useHistory();
    useEffect(
        () =>
            userApi.getById(id).then((result) => {
                setUser(result);
            }),
        []
    );

    // const handleBackClick = () => {
    //     history.goBack();
    // };

    const renderUser = (data) => {
        if (!data) return <h3> Loading... </h3>;
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard {...user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8"></div>
                </div>
            </div>
        );
    };
    return <>{renderUser(user)}</>;
};

export default UserPage;
