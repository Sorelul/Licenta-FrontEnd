import React from "react";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Sidebar display="lists" children={children} />
            <Footer />
        </>
    );
};

export default Layout;
