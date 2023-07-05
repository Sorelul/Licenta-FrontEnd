import axios from "axios";

export const getList = async (id_wishlist) => {
    try {
        var results = await axios.get("/wishlist/" + id_wishlist);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOwnedList = async () => {
    try {
        var results = await axios.get("/wishlist/owned");
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateList = async (list) => {
    try {
        var results = await axios.put("/wishlist/", list);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteList = async (id_wishlist) => {
    try {
        var results = await axios.delete("/wishlist/" + id_wishlist);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const getWishlistsForUserFromGroup = async (user_id, group_id) => {
    try {
        var results = await axios.get("/wishlist/alllistsofmemberfromgroup/" + user_id + "/" + group_id);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};
