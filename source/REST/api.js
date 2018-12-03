import axios from "axios";
import { MAIN_URL, TOKEN } from "./index";

export const api = {
    fetchTasks: () => {
        return axios({
            method:  "get",
            url:     MAIN_URL,
            headers: { authorization: TOKEN },
        });
    },
    createTask: (payload) => {
        return axios({
            method:  "post",
            url:     MAIN_URL,
            headers: {
                authorization:  TOKEN,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(payload),
        });
    },
    removeTask: (POST_ID) => {
        return axios({
            method:  "delete",
            url:     `${MAIN_URL}${POST_ID}`,
            headers: {
                authorization: TOKEN,
            },
        });
    },
    updateTask: (payload) => {
        return axios({
            method:  "put",
            url:     MAIN_URL,
            headers: {
                authorization:  TOKEN,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(payload),
        });
    },
};
