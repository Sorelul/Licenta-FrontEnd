import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Icons + img
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import NoAvatar from "../../../assets/noAvatar.jpg";
// Context
import { AuthContext } from "../../../context/authContext";
// Api
import {
    getGroupMembers,
    getGroup,
    removeUserFromGroup,
    inviteToGroup,
    sendEmailToGroupMembers,
} from "../../../api/groupsApi";
// Components
import ContextMenu from "../../../helpers/menu_context/ContextMenu";
import AddNewUserModal from "../../../helpers/modal/AddNewUserModal";

const GroupsList = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const params = useParams();
    const { logout, currentUser } = useContext(AuthContext);
    const [show, setShow] = useState(1);
    const [members, setMembers] = useState([]);
    const [currentGroup, setCurrentGroup] = useState({});

    //? Email Group
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");

    const handleEmailGroupSend = async () => {
        if (emailSubject && emailBody) {
            // continue sending email
            var response = await sendEmailToGroup();
            if (response) {
                MySwal.fire({
                    title: <strong>The email has been send.</strong>,
                    html: "Your email has been sent to the group members",
                    icon: "success",
                });
                setEmailSubject("");
                setEmailBody("");
            }
        } else {
            MySwal.fire({
                title: <strong>Email subject or body is empty!</strong>,
                html: "<strong>Email subject or body is empty!</strong><br/> Please complete all required fields",
                icon: "error",
            });
        }
    };

    const sendEmailToGroup = async () => {
        const response = await sendEmailToGroupMembers(
            { emailSubject, emailBody },
            currentGroup.id_group,
            currentGroup.groups_name
        );
        if (response?.error == false) {
            return true;
        } else {
            var error_text = "";
            response.errors.forEach((error) => {
                error_text += error.err + "<br/>";
            });

            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: { error_text },
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
                return false;
            });
        }
    };

    //? Modal
    const [openModal, setOpenModal] = useState(false);

    const handleMemberAdd = async (pair) => {
        if (pair.email && pair.name) {
            var response = await inviteUsers([pair], currentGroup.id_group, currentGroup.groups_name);
            if (response) {
                setOpenModal(false);
                MySwal.fire({
                    title: <strong>The invitation has been send.</strong>,
                    html: "An invitation code was sent to your friends email.",
                    icon: "success",
                });
            }
        } else {
            setOpenModal(false);
            MySwal.fire({
                title: <strong>Email or Name is empty!</strong>,
                html: "<strong>Email or Name is empty!</strong><br/> Please complete all required fields",
                icon: "error",
            });
        }
    };

    const inviteUsers = async (completedPairs, id_group, groupName) => {
        const response = await inviteToGroup(completedPairs, id_group, groupName);
        if (response?.error == false) {
            return true;
        } else {
            var error_text = "";
            response.errors.forEach((error) => {
                error_text += error.err + "<br/>";
            });

            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: { error_text },
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
                return false;
            });
        }
    };

    //? Admin
    const [isAdmin, setIsAdmin] = useState(false);

    //? Context Menu
    const buttonRef = useRef(null);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const handleContextMenu = (event) => {
        event.preventDefault();
        setShowContextMenu(true);
    };
    const handleCloseContextMenu = () => {
        setShowContextMenu(false);
    };
    useEffect(() => {
        const handleOutsideClick = () => {
            handleCloseContextMenu();
        };

        if (showContextMenu) {
            window.addEventListener("click", handleOutsideClick);
        }

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [showContextMenu]);
    //? End context menu

    const getCurrentGroup = async (id_group) => {
        const response = await getGroup(id_group);
        if (response?.error == false) {
            if (response) {
                setCurrentGroup(response.data[0]);
            } else {
                MySwal.fire({
                    title: <strong>No group returned</strong>,
                    html: "",
                    icon: "error",
                }).then(() => {
                    return null;
                });
            }
        } else {
            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    const getMembers = async (id_group) => {
        const response = await getGroupMembers(id_group);
        if (response?.error == false) {
            if (response) {
                setMembers(response.data);
            } else {
                MySwal.fire({
                    title: <strong>No member returned</strong>,
                    html: "",
                    icon: "error",
                }).then(() => {
                    return null;
                });
            }
        } else {
            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    const removeMember = async (id_user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the deletion
                removeMemberAction(id_user);
            }
        });
    };

    const removeMemberAction = async (id_user) => {
        const response = await removeUserFromGroup(currentGroup.id_group, id_user);
        if (response?.error == false) {
            if (response) {
                getMembers(currentGroup.id_group);
            } else {
                MySwal.fire({
                    title: <strong>No member returned</strong>,
                    html: "",
                    icon: "error",
                }).then(() => {
                    return null;
                });
            }
        } else {
            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    const sendEmailToMember = async (id_member) => {
        console.log(id_member);
    };

    const timeDiff = (dateString) => {
        // Create a Date object from the date string
        const date = new Date(dateString);

        // Get the current date and time
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDiff = currentDate - date;

        // Convert the time difference to a human-readable format
        const secondsDiff = Math.floor(timeDiff / 1000);
        const minutesDiff = Math.floor(secondsDiff / 60);
        const hoursDiff = Math.floor(minutesDiff / 60);
        const daysDiff = Math.floor(hoursDiff / 24);
        const monthsDiff = Math.floor(daysDiff / 30);
        const yearsDiff = Math.floor(monthsDiff / 12);

        let timeAgo;
        if (yearsDiff > 0) {
            timeAgo = `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
        } else if (monthsDiff > 0) {
            timeAgo = `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
        } else if (daysDiff > 0) {
            timeAgo = `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
        } else if (hoursDiff > 0) {
            timeAgo = `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
        } else if (minutesDiff > 0) {
            timeAgo = `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
        } else {
            timeAgo = `${secondsDiff} second${secondsDiff > 1 ? "s" : ""} ago`;
        }

        return timeAgo;
    };

    useEffect(() => {
        getCurrentGroup(params.id);
        getMembers(params.id);
        if (currentUser?.id_user == currentGroup?.groups_admin) {
            setIsAdmin(true);
        }
    }, [params]);

    if (currentGroup !== null) {
        return (
            <div className="w-screen h-screen flex justify-center">
                <div className="w-3/4 h-5/6 shadow-xl my-auto">
                    {/* HEADER */}
                    <div id="group-header" className="h-[20%] bg-gradient-to-r from-yellow-600 to-gray-800">
                        {/* //? Group Settings */}
                        {isAdmin ? (
                            <div className="w-full h-[15%] flex justify-end items-end">
                                <div
                                    className="w-[20%] h-full flex justify-center items-center rounded-bl-lg rounded-br-lg mr-5"
                                    style={{ backgroundColor: "rgba(244,244,244,0.3)" }}
                                >
                                    <span
                                        className="flex my-auto hover:text-white cursor-pointer"
                                        onClick={() => {
                                            navigate("/groups/edit/" + currentGroup.id_group);
                                        }}
                                    >
                                        <FontAwesomeIcon className="my-auto" icon={faGear} />{" "}
                                        <p className="ml-2">Settings</p>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="w-full h-[85%] flex justify-start items-center">
                            <h1 className="text-4xl font-bold pl-10">{currentGroup?.groups_name}</h1>
                            <div className="flex mr-20 text-white" style={{ marginLeft: "auto" }}>
                                <button
                                    onClick={() => setShow(1)}
                                    className={`px-4 py-2 mr-5 ${
                                        show == 1
                                            ? "text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 active:bg-yellow-700"
                                            : ""
                                    }`}
                                >
                                    <h2 className="text-2xl font-bold">Members</h2>
                                </button>

                                <button
                                    onClick={() => setShow(2)}
                                    className={`px-4 py-2 mr-5 ${
                                        show == 2
                                            ? "text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 active:bg-yellow-700"
                                            : ""
                                    }`}
                                >
                                    <h2 className="text-2xl font-bold">Email Group</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* ITEMS  */}
                    <div className="w-full h-[80%] overflow-auto">
                        <div className="h-[80px] text-black pl-10 bg-gray-800">
                            <div className="flex items-center h-full">
                                <span className="ml-5 text-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setOpenModal(!openModal)}
                                        className="text-gray-100 mr-10 mb-2 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                    >
                                        <FontAwesomeIcon className="my-auto mr-3" icon={faPlus} />
                                        Invite more members
                                    </button>
                                    <AddNewUserModal
                                        open={openModal}
                                        onClose={() => setOpenModal(!openModal)}
                                        onAdd={handleMemberAdd}
                                    />
                                </span>
                            </div>
                        </div>

                        {show == 1 ? (
                            <div>
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {members?.map((member, index) => (
                                        <li key={index} className="py-3 sm:py-4">
                                            <div className="flex justify-between space-x-4 w-full">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0 pl-10">
                                                        <img
                                                            className="w-16 h-16 rounded-full"
                                                            src={
                                                                member?.users_profile_image
                                                                    ? member.users_profile_image
                                                                    : NoAvatar
                                                            }
                                                            alt="User Image"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0 lg:min-w-[250px] max-w-[400px]">
                                                        <p className="text-lg font-medium text-gray-900 truncate ">
                                                            {member?.users_username ? member.users_username : "Jon Doe"}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-500">
                                                            {member?.users_email ? member.users_email : "Jon@Doe.com"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="inline-flex items-center text-base font-light text-gray-600">
                                                    <p className="text-2xl">&#127874;</p>{" "}
                                                    {member?.users_date_of_birth
                                                        ? new Date(member.users_date_of_birth).toLocaleDateString(
                                                              undefined,
                                                              { year: "numeric", month: "long", day: "numeric" }
                                                          )
                                                        : "Unknown"}
                                                </div>
                                                <div className="inline-flex  text-base font-light text-gray-900 items-center">
                                                    Last seen:{" "}
                                                    {/* new Date(member.users_last_heartbeat) - new Date() */}
                                                    {member?.users_last_heartbeat
                                                        ? timeDiff(member.users_last_heartbeat)
                                                        : "Unknown"}
                                                </div>
                                                <div className="inline-flex  text-base font-light text-gray-900 items-center pr-20">
                                                    {isAdmin && currentGroup?.groups_admin != member.id_user ? (
                                                        <>
                                                            <button
                                                                ref={buttonRef}
                                                                type="button"
                                                                onContextMenu={handleContextMenu}
                                                                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                                                            >
                                                                <FontAwesomeIcon icon={faEllipsis} />
                                                            </button>
                                                            {showContextMenu && (
                                                                <ContextMenu
                                                                    buttonRef={buttonRef}
                                                                    onClose={handleCloseContextMenu}
                                                                    onRemoveClick={() => removeMember(member.id_user)}
                                                                    onSendEmailClick={() =>
                                                                        sendEmailToMember(member.id_user)
                                                                    }
                                                                />
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : show == 2 ? (
                            <div className="p-10">
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={emailSubject}
                                            onChange={(e) => setEmailSubject(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            rows="8"
                                            value={emailBody}
                                            onChange={(e) => setEmailBody(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleEmailGroupSend}
                                            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                        >
                                            Send Email
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        navigate("/not-found");
        return null;
    }
};

export default GroupsList;
