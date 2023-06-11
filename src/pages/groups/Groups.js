import React, { useState, useEffect, useContext } from "react";
// SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Context
import { AuthContext } from "../../context/authContext";
// Components
import GroupLanding from "./components/GroupLanding";
import GroupsList from "./components/GroupsList";
import Sidebar from "../../helpers/sidebar/Sidebar";

const Groups = () => {
    const { groupsVisibility, setGroupVisibility } = useContext(AuthContext);

    return <>{groupsVisibility ? <Sidebar display="groups" children={GroupsList} /> : <GroupLanding />}</>;
};

export default Groups;
