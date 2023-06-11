import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
// -- Pages --
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Add_new from "./pages/add_new/Add_new";
import Register from "./pages/register/Register.jsx";
import Navbar from "./helpers/navbar/Navbar.js";
import Footer from "./helpers/footer/Footer.js";
import Lists from "./pages/lists/Lists.js";
import ListSettings from "./pages/list_settings/ListSettings";
import Layout from "./helpers/layout/Layout";
import IGotThisList from "./pages/i_got_this_list/IGotThisList";
import Groups from "./pages/groups/Groups";
import AddGroup from "./pages/groups/components/AddGroup";
// -- End Pages --

function App() {
    const { currentUser, getWishlists, wishlists } = useContext(AuthContext);
    const [showHome, setShowHome] = useState(true);

    useEffect(() => {
        getWishlists();
    }, []);

    useEffect(() => {}, [showHome]);

    useEffect(() => {
        if (wishlists.length > 0) {
            setShowHome(false);
        } else {
            setShowHome(true);
        }
    }, [wishlists]);

    return (
        <Router>
            <Routes>
                {/* ---------- HOME ----------*/}
                <Route
                    path="/"
                    element={
                        currentUser ? (
                            showHome ? (
                                <>
                                    <Navbar />
                                    <Home />
                                    <Footer />
                                </>
                            ) : (
                                <Navigate to="/list" replace={true} />
                            )
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route path="/home" element={<Navigate to="/" replace={true} />} />

                {/* ---------- ADD NEW ---------- */}
                <Route
                    path="/add_new"
                    element={
                        currentUser ? (
                            <>
                                <Navbar />
                                <Add_new />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                {/* ---------- LISTS ------- */}
                <Route
                    path="/list/i-got-this"
                    element={
                        <Layout>
                            <IGotThisList />
                        </Layout>
                    }
                />
                <Route
                    path="/list/:id"
                    element={
                        currentUser ? (
                            showHome ? (
                                <Navigate to="/" replace={true} />
                            ) : (
                                <>
                                    <Layout>
                                        <Lists />
                                    </Layout>
                                </>
                            )
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route
                    path="/list/edit/:id"
                    element={
                        currentUser ? (
                            showHome ? (
                                <Navigate to="/" replace={true} />
                            ) : (
                                <>
                                    <Layout>
                                        <ListSettings />
                                    </Layout>
                                </>
                            )
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route
                    path="/list"
                    element={
                        currentUser ? (
                            showHome ? (
                                <Navigate to="/" replace={true} />
                            ) : (
                                <>
                                    <Layout />
                                </>
                            )
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                {/* ---------- GROUPS ---------- */}

                <Route
                    path="/groups"
                    element={
                        currentUser ? (
                            <>
                                <Navbar />
                                <Groups />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route
                    path="/groups/new"
                    element={
                        currentUser ? (
                            <>
                                <Navbar />
                                <AddGroup />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                {/* ---------- LOGIN & REGISTER ---------- */}
                <Route path="/login" element={currentUser ? <Navigate to="/" replace={true} /> : <Login />} />
                <Route path="/register" element={currentUser ? <Navigate to="/" replace={true} /> : <Register />} />
            </Routes>
        </Router>
    );
}

export default App;
