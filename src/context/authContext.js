import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const MySwal = withReactContent(Swal);
  const [wishlists, setWishlists] = useState([]);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
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
  }, [currentUser]);


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        getWishlists,
        wishlists
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
