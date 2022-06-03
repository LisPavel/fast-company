/**
 *
 * @param {Date} date1
 * @param {Date} date2
 * @param {"ms" | "s" | "m" | "h" | "d"} unit
 */
const calcDateDiffIn = (date1, date2, unit = "ms") => {
    const diff = date1 - date2;
    switch (unit) {
        case "s":
            return diff / 1000;
        case "m":
            return diff / 60000;
        case "h":
            return diff / 3600000;
        case "d":
            return diff / 86400000;
        default:
            return diff;
    }
};

/**
 *
 * @param {string} dateStr
 */
const formatDate = (dateStr) => {
    const today = new Date();
    const date = new Date(parseInt(dateStr));

    const diffInSec = calcDateDiffIn(today, date, "s");
    if (diffInSec <= 60) return "1 минуту назад";

    const diffInMin = calcDateDiffIn(today, date, "m");

    if (diffInMin <= 5) return "5 минут назад";
    if (diffInMin <= 10) return "10 минут назад";
    if (diffInMin <= 30) return "30 минут назад";

    const diffInDays = calcDateDiffIn(today, date, "d");
    if (diffInDays <= 1) return `${date.getHours()}.${date.getMinutes()}`;
    if (diffInDays <= 365) return `${date.getDate()}.${date.getMonth() + 1}`;

    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};

export { calcDateDiffIn, formatDate };
