export const validator = (data, cfg) => {
    const errors = {};

    const validate = (method, value, cfg) => {
        let statusValidate;
        switch (method) {
            case "isRequired":
                if (typeof value === "boolean") statusValidate = !value;
                else statusValidate = value.trim() === "";
                break;

            case "isEmail": {
                const emailRegExp = /^([a-zA-Z]{1}\S+)@(\w+)\.([a-z]+)$/g;
                statusValidate = !emailRegExp.test(value);
                break;
            }

            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(value);
                break;
            }

            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(value);
                break;
            }

            case "min": {
                statusValidate = value.length < cfg.value;
                break;
            }

            default:
                break;
        }
        return statusValidate && cfg.message;
    };

    for (const fieldName of Object.keys(data)) {
        if (cfg[fieldName] == null) continue;
        // console.log(fieldName);
        for (const validateMethod of Object.keys(cfg[fieldName])) {
            const error = validate(
                validateMethod,
                data[fieldName],
                cfg[fieldName][validateMethod]
            );
            if (!error || errors[fieldName] != null) continue;
            errors[fieldName] = error;
        }
    }

    return errors;
};
