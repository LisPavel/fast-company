export const validator = (data, cfg) => {
  const errors = {};

  const validate = (method, value, cfg) => {
    switch (method) {
      case "isRequired":
        if (value.trim() === "") return cfg.message;
        break;

      default:
        break;
    }
  };

  for (const fieldName of Object.keys(data)) {
    for (const validateMethod of Object.keys(cfg[fieldName])) {
      const error = validate(
        validateMethod,
        data[fieldName],
        cfg[fieldName][validateMethod]
      );
      if (!error) continue;
      errors[fieldName] = error;
    }
  }

  return errors;
};
