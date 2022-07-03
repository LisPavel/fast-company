import React from "react";
import { useParams, useHistory } from "react-router-dom";

// import userApi from "../../../api/fake.api/user.api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
// import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
// import _ from "lodash";

const UserPage = () => {
    const { id } = useParams();

    const user = useSelector(getUserById(id));
    // const [user, setUser] = useState();
    const history = useHistory();

    const handleBackClick = () => {
        history.push("/users");
    };

    const renderUser = (data) => {
        if (!data) return <h3> Loading... </h3>;
        return (
            <div className="container">
                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={handleBackClick}
                >
                    <i className="bi bi-chevron-left"></i> Users
                </button>
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={data} />
                        <QualitiesCard qualities={data.qualities} />
                        <MeetingsCard
                            completedMeetings={data.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    };
    return <>{renderUser(user)}</>;
};

export default UserPage;
