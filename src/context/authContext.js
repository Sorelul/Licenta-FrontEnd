import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getGroups } from "../api/groupsApi";
import withReactContent from "sweetalert2-react-content";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const MySwal = withReactContent(Swal);
    const [wishlists, setWishlists] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupsVisibility, setGroupsVisibility] = useState(
        JSON.parse(localStorage.getItem("groupsVisibility")) || false
    );

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data);
    };

    const logout = async () => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    };

    const getGroupsInfo = async () => {
        const response = await getGroups();
        if (response?.error == false) {
            setGroups(response?.data);
        }
    };

    const getWishlists = async () => {
        try {
            const user_id = currentUser.id_user;
            const res = await axios.get("/wishlist/all/" + user_id).then((results) => {
                setWishlists(results.data);
            });
        } catch (error) {
            console.log(error);
            if (error.response?.data.message == "Unauthorized!" && currentUser) {
                MySwal.fire({
                    title: <strong>You are not authorized</strong>,
                    html: <i>You will be disconnected!</i>,
                    icon: "error",
                }).then(() => {
                    logout();
                });
            }
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        getGroupsInfo();
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem("groupsVisibility", JSON.stringify(groupsVisibility));
    }, [groupsVisibility]);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                logout,
                getWishlists,
                wishlists,
                groups,
                groupsVisibility,
                setGroupsVisibility,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
