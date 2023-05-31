import { message, notification } from "antd";

export const handleResponse = (msg) => {
    message.success({
        content: msg,
        style: {
            marginTop: '10vh',
            fontFamily: 'cairo',
        },
    })
}

export const handleError = (msg, error) => {
    message.error({
        content: msg,
        style: {
            marginTop: '10vh',
            fontFamily: 'cairo',
        },
    });
}