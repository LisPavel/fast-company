/**
 *
 * @param {number} value
 * @param {"ms" | "s" | "m" | "h" | "d"} unit
 */
const convertToUnit = (value, unit) => {
    switch (unit) {
        case "s":
            return value / 1000;
        case "m":
            return value / 60000;
        case "h":
            return value / 3600000;
        case "d":
            return value / 86400000;
        default:
            return value;
    }
};

/**
 *
 * @param {string} dateStr
 */
const formatDate = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = today - date;

    const diffInSec = convertToUnit(diff, "s");
    if (diffInSec <= 60) return "1 минуту назад";

    const diffInMin = convertToUnit(diff, "m");

    if (diffInMin <= 5) return "5 минут назад";
    if (diffInMin <= 10) return "10 минут назад";
    if (diffInMin <= 30) return "30 минут назад";

    const diffInDays = convertToUnit(diff, "d");
    if (diffInDays <= 1) {
        return `${date.getHours()}:${
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`;
    }
    if (diffInDays <= 365) return `${date.getDate()}.${date.getMonth() + 1}`;

    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};

export const isOutdated = (date, minutes = 1) => {
    return Date.now() - date > minutes * 60 * 1000;
};

export { convertToUnit, formatDate };
