// React
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../../context/authContext";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
// Helpers

const GroupsList = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const { groups } = useContext(AuthContext);
    const [currentGroup, setCurrentGroup] = useState({});
    const params = useParams();
    const [show, setShow] = useState(1);

    useEffect(() => {
        setCurrentGroup(groups.find((group) => group.id_group == params.id));
    }, [params]);

    if (currentGroup) {
        return (
            <div className="w-screen h-screen flex justify-center">
                <div className="w-3/4 h-5/6 shadow-xl my-auto">
                    {/* HEADER */}
                    <div id="group-header" className="h-[20%] bg-gradient-to-r from-yellow-600 to-gray-800">
                        {/* //? Group Settings */}
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
                                        className="text-gray-100 mr-10 mb-2 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                    >
                                        <FontAwesomeIcon className="my-auto mr-3" icon={faPlus} />
                                        Invite more members
                                    </button>
                                </span>
                            </div>
                        </div>

                        <div>{/* //? Members map */}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        navigate("/not-found");
    }
};

export default GroupsList;
