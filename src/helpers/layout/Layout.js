import React from "react";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children, display }) => {
    return (
        <>
            <Navbar />
            <Sidebar display={display} children={children} />
            <Footer />
        </>
    );
};

export default Layout;
