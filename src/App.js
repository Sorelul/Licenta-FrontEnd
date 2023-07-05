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
import JoinGroup from "./pages/groups/components/JoinGroup";
import GroupsList from "./pages/groups/components/GroupsList";
import Error404 from "./helpers/404/Error404";
import ShopHome from "./pages/shop_for/ShopHome";
import ColumnShop from "./helpers/column_shop/ColumnShop";
// -- End Pages --

function App() {
    const { currentUser, getWishlists, wishlists } = useContext(AuthContext);

    useEffect(() => {
        getWishlists();
    }, []);

    return (
        <Router>
            <Routes>
                {/* ---------- HOME ----------*/}
                <Route
                    path="/"
                    element={
                        currentUser ? (
                            <>
                                <Navbar />
                                <Home />
                                <Footer />
                            </>
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
                        <Layout display="lists">
                            <IGotThisList />
                        </Layout>
                    }
                />
                <Route
                    path="/list/:id"
                    element={
                        currentUser ? (
                            <>
                                <Layout display="lists">
                                    <Lists />
                                </Layout>
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route
                    path="/list/edit/:id"
                    element={
                        currentUser ? (
                            <>
                                <Layout display="lists">
                                    <ListSettings />
                                </Layout>
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route
                    path="/list"
                    element={
                        currentUser ? (
                            <>
                                <Layout display="lists" />
                            </>
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

                <Route
                    path="/groups/join"
                    element={
                        currentUser ? (
                            <>
                                <Navbar />
                                <JoinGroup />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route
                    path="/groups/:id"
                    element={
                        currentUser ? (
                            <>
                                <Layout display="groups">
                                    <GroupsList />
                                </Layout>
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                {/* ---------- Shop For ---------- */}

                <Route
                    path="/shop"
                    element={
                        currentUser ? (
                            <>
                                <Navbar />

                                <ShopHome />

                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                <Route path="/not-found" element={<Error404 />} />

                {/* ---------- LOGIN & REGISTER ---------- */}
                <Route path="/login" element={currentUser ? <Navigate to="/" replace={true} /> : <Login />} />
                <Route path="/register" element={currentUser ? <Navigate to="/" replace={true} /> : <Register />} />

                {/*  Page Not Found */}

                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    );
}

export default App;
