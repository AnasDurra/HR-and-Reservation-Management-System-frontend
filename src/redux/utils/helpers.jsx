import { message, notification } from "antd";

export const handleResponse = (msg) => {
    message.destroy();
    message.success({
        content: msg,
        style: {
            marginTop: '10vh',
            fontFamily: 'cairo',
        },
    });
}

export const handleError = (msg, error) => {
    message.destroy();
    message.error({
        content: msg,
        style: {
            marginTop: '10vh',
            fontFamily: 'cairo',
            zIndex: "5000"
        },
    });
}