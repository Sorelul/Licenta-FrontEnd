import axios from "axios";

export const getGroup = async (id_group) => {
    try {
        var results = await axios.get("/group/" + id_group);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const getGroups = async () => {
    try {
        var results = await axios.get("/group/all");
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateGroup = async (group) => {
    try {
        var results = await axios.put("/group/", group);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const addGroup = async (group) => {
    try {
        Object.keys(group).forEach((attribute) => group[attribute] == "" && (group[attribute] = null));
        var results = await axios.post("/group/", group);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteGroup = async (id_group) => {
    try {
        var results = await axios.delete("/group/" + id_group);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const inviteToGroup = async (members, id_group, groupName) => {
    try {
        var results = await axios.post("/group/invite", { members, id_group, groupName });
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const addUserToGroup = async (code) => {
    try {
        var results = await axios.post("/group/join", { code });
        return results.data;
    } catch (error) {
        console.log(error);
    }
};
