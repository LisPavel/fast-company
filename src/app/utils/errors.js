export const generateAuthError = ({ code, message }) => {
    switch (code) {
        case 400: {
            switch (message) {
                case "EMAIL_EXISTS":
                    return "User with this email already exists";
                case "INVALID_PASSWORD":
                    return "Incorrect password. Try again";
                case "EMAIL_NOT_FOUND":
                    return "No user with such email";
            }
        }
    }
};
