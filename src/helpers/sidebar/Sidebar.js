import React, { useContext, useEffect, useState } from "react";
import img1 from "../../assets/my_lists.svg";
import checkImg from "../../assets/check-white.svg";
import listImg from "../../assets/list-white.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Sidebar = ({ children }) => {
    const navigate = useNavigate();
    const { wishlists, getWishlists } = useContext(AuthContext);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        getWishlists();
    }, []);

    return (
        <div className="flex">
            <button
                className="block sm:hidden fixed bottom-10 right-10 bg-blue-500 text-white rounded-full p-4"
                onClick={() => setShowSidebar(!showSidebar)}
            >
                {showSidebar ? "Hide" : "Show"} Sidebar
            </button>
            {/* <div className="w-3/12 h-screen sm:block hidden" aria-label="Sidebar"> */}
            <div
                className={`w-3/12 h-screen ${showSidebar ? "sm:bloc" : "sm:block hidden"} bg-gray-50 dark:bg-gray-800`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-center mt-5 mb-12">
                        <img src={img1} className="w-2/6 h-2/6" />
                        <h2 className="mt-5 text-2xl font-bold text-gray-300"> My Lists </h2>
                    </div>
                    <button
                        onClick={() => {
                            navigate("/add_new");
                        }}
                        type="button"
                        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center -mt-10 mr-2 mb-5 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-full"
                    >
                        Add new list
                    </button>
                    <ul className="space-y-2 font-medium">
                        {wishlists.map((wishlist, index) =>
                            wishlist.wishlists_i_got_this == 0 ? (
                                <li key={index}>
                                    <a
                                        onClick={() => {
                                            navigate(`/list/${wishlist.id_wishlist}`);
                                        }}
                                        className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <img
                                            src={listImg}
                                            aria-hidden="true"
                                            className="w-6 h-6 transition duration-75"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        />

                                        <span className="ml-3">{wishlist.wishlists_name}</span>
                                    </a>
                                </li>
                            ) : (
                                <div key={index}></div>
                            )
                        )}

                        <li>
                            <a
                                href="/list/i-got-this"
                                className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <img
                                    src={checkImg}
                                    aria-hidden="true"
                                    className="w-6 h-6 transition duration-75"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                />

                                <span className="ml-3">I Got This List</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Sidebar;
