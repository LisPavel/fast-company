import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { validator } from "../../utils/validator";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false,
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();

    useEffect(() => {
        api.professions
            .fetchAll()
            .then((profs) =>
                Object.values(profs).map((prof) => ({
                    label: prof.name,
                    value: prof._id,
                }))
            )
            .then((profs) => setProfessions(profs));
        api.qualities
            .fetchAll()
            .then((qualities) =>
                Object.values(qualities).map((qualitie) => ({
                    label: qualitie.name,
                    value: qualitie._id,
                    color: qualitie.color,
                }))
            )
            .then((qualities) => setQualities(qualities));
    }, []);

    const handleChange = (data) => {
        if (!data) return;
        setData((prevState) => ({
            ...prevState,
            [data.name]: data.value,
        }));
        // setEmail(ev.target.value);
    };

    const validatorCfg = {
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Not correct email" },
        },
        password: {
            isRequired: { message: "Password is required" },
            isCapitalSymbol: {
                message: "Password required at list 1 capital symbol",
            },
            isContainDigit: {
                message: "Password required at list 1 digit",
            },
            min: {
                value: 8,
                message: "Password required minimum 8 symbols",
            },
        },
        profession: {
            isRequired: { message: "Profession is required" },
        },
        license: {
            isRequired: {
                message: "You can't use this site without license agreement",
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorCfg);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => validate(), [data]);

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
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities),
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <SelectField
                    label="Profession"
                    defaultValue="Chose your prof"
                    error={errors.profession}
                    name="profession"
                    onChange={handleChange}
                    options={professions}
                    value={data.profession}
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
                    value={data.sex}
                    label="Select gender"
                />
                <MultiSelectField
                    name="qualities"
                    options={qualities}
                    onChange={handleChange}
                    value={data.qualities}
                    label="Qualities"
                    defaultValue={data.qualities}
                />
                <CheckBoxField
                    name="license"
                    onChange={handleChange}
                    value={data.license}
                    error={errors.license}
                >
                    Confirm <a>license agreement</a>
                </CheckBoxField>
                <button
                    className="btn btn-primary w-100 mx-auto"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
