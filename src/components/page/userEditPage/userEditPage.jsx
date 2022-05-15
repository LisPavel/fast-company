import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import Qualities from "../../ui/qualities";
import api from "../../../api";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
// import _ from "lodash";

const UserEditPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const toUiData = ({ name: label, _id: value, ...other }) => {
        return { ...other, label, value };
    };

    useEffect(
        () =>
            Promise.all([
                api.users.getById(id),
                api.professions.fetchAll(),
                api.qualities.fetchAll(),
            ])
                .then(([userData, profs, qualitiesData]) => {
                    setUser({
                        ...userData,
                        profession: userData.profession._id,
                        qualities: userData.qualities.map(toUiData),
                    });
                    setProfessions(Object.values(profs).map(toUiData));
                    setQualities(Object.values(qualitiesData).map(toUiData));
                })
                .finally(() => setIsLoading(false)),
        []
    );
    useEffect(() => console.log(user), [user]);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleChange = (data) => {
        if (!data) return;
        setUser((prevState) => ({
            ...prevState,
            [data.name]: data.value,
        }));
        // setEmail(ev.target.value);
    };

    const validatorCfg = {
        name: {
            isRequired: { message: "User name is required" },
            min: {
                value: 3,
                message: "Name requires at list 3 symbols",
            },
        },
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Not correct email" },
        },
        qualities: {
            min: {
                value: 1,
                message: "Required at list one quality",
            },
        },
    };

    const validate = () => {
        const errors = validator(user, validatorCfg);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => validate(), [user]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color,
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = user;
        console.log({
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities),
        });
        api.users
            .update(id, {
                ...user,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities),
            })
            .then(() => history.goBack());
    };

    const renderFields = () => {
        if (isLoading) return <h3> Loading... </h3>;
        return (
            <>
                <TextField
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <SelectField
                    label="Profession"
                    defaultValue="Chose your prof"
                    error={errors.profession}
                    name="profession"
                    onChange={handleChange}
                    options={professions}
                    value={user.profession}
                />
                <RadioField
                    name="sex"
                    error={errors.sex}
                    onChange={handleChange}
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" },
                    ]}
                    value={user.sex}
                    label="Select gender"
                />
                <MultiSelectField
                    name="qualities"
                    options={qualities}
                    onChange={handleChange}
                    value={user.qualities}
                    label="Qualities"
                    defaultValue={user.qualities}
                    error={errors.qualities}
                />
            </>
        );
    };

    return (
        <form
            className="card border-top-0 border-bottom-0"
            onSubmit={handleSubmit}
        >
            <div className="card-header ps-0">
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-link"
                        onClick={handleBackClick}
                        type="button"
                    >
                        <i className="bi bi-chevron-left" />
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        disabled={!isValid}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="card-body">{renderFields()}</div>
        </form>
    );
};

export default UserEditPage;
