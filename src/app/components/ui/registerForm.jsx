import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { validator } from "../../utils/validator";
// import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false,
        image: createImage(),
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { signUp } = useAuth();

    const qualities = useSelector(getQualities());
    const professions = useSelector(getProfessions());

    const qualitiesOptions = toOptions(qualities);
    const professionOptions = toOptions(professions);

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
        name: {
            isRequired: { message: "Name is required" },
            min: { message: "Name required minimum 3 symbols", value: 3 },
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
        image: {
            isRequired: {
                message: "You need to create image",
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

    function toOptions(arr = []) {
        return arr.map((item) => ({
            value: item._id,
            label: item.name,
        }));
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map(({ value }) => value),
        };
        console.log(newData);
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    function createImage() {
        return `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`;
    }

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
                <TextField
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <SelectField
                    label="Profession"
                    defaultValue="Chose your prof"
                    error={errors.profession}
                    name="profession"
                    onChange={handleChange}
                    options={professionOptions}
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
                    options={qualitiesOptions}
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

                <img
                    src={data.image}
                    alt="avatar"
                    className="img-responsive rounded-circle shadow-sm mb-3"
                    height="140px"
                />

                <button
                    className="btn btn-primary ms-3 "
                    onClick={() =>
                        handleChange({
                            name: "image",
                            value: createImage(),
                        })
                    }
                    type="button"
                >
                    Update image
                </button>

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
