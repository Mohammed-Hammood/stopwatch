
const formated = (time: number): string => time < 10 ? `0${time}` : `${time}`;

export const getFormatedDateTime = (dateTimeString: string): string  => {
    const dateTime = new Date(dateTimeString);
    const time = `${formated(dateTime.getHours())}:${formated(dateTime.getMinutes())}`;
    const date = `${formated(dateTime.getDate())}-${formated(dateTime.getMonth() + 1)}-${formated(dateTime.getFullYear())}`;

    return `${time}, ${date}`;
}


export const getTimeSince = (timeString: string): string => {
    const milliseconds = new Date().getTime() - new Date(timeString).getTime();

    const seconds = Math.floor(milliseconds / 1000);
    if (milliseconds < 10 * 1000) return `just now`;
    if (milliseconds < 60 * 1000) return seconds > 1 ? `${seconds} seconds ago` : `second ago`;

    const minutes = Math.floor(milliseconds / 60000);
    if (milliseconds < 3600 * 1000) return minutes > 1 ? `${minutes} minutes ago` : `minute ago`;

    const hours = Math.floor(milliseconds / 3600000);
    if (milliseconds < 86400 * 1000) return hours > 1 ? `${hours} hours ago` : `hour ago`;

    const years = Math.floor(milliseconds / 31556952000);
    return years > 1 ? `${years} years ago` : `ago`;
}
/*

const formated = (time: number): string => time < 10 ? `0${time}` : `${time}`;

export const getFormatedDateTime = (timestamp: number): string  => {
    const dateTime = new Date(timestamp * 1000);
    const time = `${formated(dateTime.getHours())}:${formated(dateTime.getMinutes())}`;
    const date = `${formated(dateTime.getDate())}-${formated(dateTime.getMonth() + 1)}-${formated(dateTime.getFullYear())}`;
    return `${time}, ${date}`;
}


export const getTimeSince = (timestamp: number): string => {

    const seconds = Math.floor(timestamp / 1000);
    if (timestamp < 10 * 1000) return `just now`;
    if (timestamp < 60 * 1000) return seconds > 1 ? `${seconds} seconds ago` : `second ago`;

    const minutes = Math.floor(timestamp / 60000);
    if (timestamp < 3600 * 1000) return minutes > 1 ? `${minutes} minutes ago` : `minute ago`;

    const hours = Math.floor(timestamp / 3600000);
    if (timestamp < 86400 * 1000) return hours > 1 ? `${hours} hours ago` : `hour ago`;

    const years = Math.floor(timestamp / 31556952000);
    return years > 1 ? `${years} years ago` : `ago`;
}
*/