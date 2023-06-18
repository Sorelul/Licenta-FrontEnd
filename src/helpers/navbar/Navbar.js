import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../context/authContext";
// Icons + Images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import noAvatar from "../../assets/noAvatar.jpg";
import logo from "../../assets/logo.png";
// Api
import { getNotifications, setNotificationsSeen, deleteNotification } from "../../api/notificationsApi";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Modal
import NotificationsModal from "../modal/NotificationsModal";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        getCurrentNotifications();
    }, []);

    const getCurrentNotifications = async () => {
        var response = await getNotifications(currentUser.id_user);
        if (response.error == true) {
            console.log("----------------- Notifications Error -----------------");
            console.log("There was an error while waiting for notifications!");
            console.log("BE Message: " + response.message);
            console.log("----------------- End of error log -----------------");
            if (response.errorCode == 1) {
                logout();
            }
        } else {
            setNotifications(response.data);
        }
    };

    const setVisiblityOfNotifications = async () => {
        var response = await setNotificationsSeen(currentUser.id_user);
        if (response.error == true) {
            console.log("----------------- Notifications Error -----------------");
            console.log("There was an error while setting the updates for notifications!");
            console.log("BE Message: " + response.message);
            console.log("----------------- End of error log -----------------");
            if (response.errorCode == 1) {
                logout();
            }
        }
    };

    const countNumberOfVisibleNotifications = () => {
        const visibleNotificationsCount = notifications.filter(
            (notification) => notification.notifications_visibility === 1
        ).length;
        return visibleNotificationsCount;
    };

    const handleModalOpen = async () => {
        await setVisiblityOfNotifications();
        await getCurrentNotifications();
        setIsOpen(true);
    };

    const handleNotificationDelete = async (id_notification) => {
        var response = await deleteNotification(id_notification);
        setIsOpen(false);
        if (response.error == false) {
            MySwal.fire({
                title: <strong>Notifications deleted</strong>,
                html: "<i>Your notification has been deleted successfully!</i>",
                icon: "success",
            }).then(async () => {
                await getCurrentNotifications();
            });
        } else if (response.error == true) {
            MySwal.fire({
                title: <strong>{response.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (response.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/home" className="flex items-center">
                    <img src={logo} className="h-8 mr-3" alt="Wishy Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white tracking-widest">
                        Wishy
                    </span>
                </a>
                <NotificationsModal
                    handleOpen={isOpen}
                    handleClose={() => {
                        setIsOpen(false);
                    }}
                    handleDelete={handleNotificationDelete}
                    notifications={notifications}
                />
                <div className="flex items-center md:order-2">
                    <button
                        type="button"
                        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                    >
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={noAvatar} alt="user photo" />
                    </button>
                    <div className="relative ml-2">
                        <button
                            onClick={handleModalOpen}
                            className="bg-red-500 border border-red-300 rounded-full w-8 h-8 flex items-center justify-center text-white"
                        >
                            <span className="text-sm font-semibold">
                                <FontAwesomeIcon icon={faBell} style={{ fontSize: "18px" }} />
                            </span>
                        </button>
                        {countNumberOfVisibleNotifications() > 0 && (
                            <div className="absolute -top-1 -right-1 bg-yellow-400 w-4 h-4 rounded-full border border-red-400 font-bold text-red-500 flex items-center justify-center">
                                {countNumberOfVisibleNotifications()}
                            </div>
                        )}
                    </div>
                    <div
                        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="user-dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                {currentUser?.users_username}
                            </span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                {currentUser?.users_email}
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button
                        data-collapse-toggle="mobile-menu-2"
                        type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="mobile-menu-2"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="/list"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                aria-current="page"
                            >
                                My Lists
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Shop For
                            </a>
                        </li>
                        <li>
                            <a
                                href="/groups"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Groups
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
