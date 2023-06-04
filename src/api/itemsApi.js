import axios from "axios";

export const getItems = async (items_id_wishlist) => {
    try {
        var results = await axios.get("/item/all/" + items_id_wishlist);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const getItem = async (id_item) => {
    try {
        var results = await axios.get("/item/" + id_item);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateItem = async (item) => {
    try {
        var results = await axios.put("/item/", item);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const addItem = async (item, id_wishlist) => {
    try {
        Object.keys(item).forEach((attribute) => item[attribute] == "" && (item[attribute] = null));
        item.items_id_wishlist = id_wishlist;
        var results = await axios.post("/item/", item);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteItem = async (id_item) => {
    try {
        var results = await axios.delete("/item/" + id_item);
        return results.data;
    } catch (error) {
        console.log(error);
    }
};
