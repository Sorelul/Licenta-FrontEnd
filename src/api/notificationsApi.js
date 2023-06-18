import axios from "axios";

export const getNotifications = async (id_user) => {
    try {
        var results = await axios.get("/notifications/" + id_user);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const setNotificationsSeen = async (id_user) => {
    try {
        var results = await axios.post("/notifications/setNotificationsSeen/" + id_user);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteNotification = async (id_notification) => {
    try {
        var results = await axios.delete("/notifications/deleteNotification/" + id_notification);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};
