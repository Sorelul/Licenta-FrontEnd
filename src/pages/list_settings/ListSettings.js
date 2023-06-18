// React
import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk, faXmark, faTrash, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
// API
import { deleteList, getList, updateList } from "../../api/wishlistsApi";
import { getGroupsForList } from "../../api/groupsApi";
// Context
import { AuthContext } from "../../context/authContext";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Color picker
import { HexColorPicker } from "react-colorful";
// Modal
import DeleteConfirmationModal from "../../helpers/modal/DeleteConfirmationModal";

const ListSettings = () => {
    const params = useParams();
    const MySwal = withReactContent(Swal);
    const { logout, getGroupsInfo, groups } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [currentList, setCurrentList] = useState({});
    const [color, setColor] = useState("");
    const navigate = useNavigate();
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [predefinedList, setPredefinedList] = useState([]);

    const getCurrentList = async (id_wishlist) => {
        var response = await getList(id_wishlist);
        if (response.error == false) {
            var localList = response.data[0];
            localList.correlatedGroups = predefinedList;
            setCurrentList(localList);
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

    const getCurrentGroupsForList = async (id_wishlist) => {
        var response = await getGroupsForList(id_wishlist);
        if (response.error == false) {
            var newArray = response.data.map((obj) => obj.cgl_id_group);
            setPredefinedList(newArray);
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

    // ! Checkboxes
    const handleCheckboxChange = (event, key) => {
        if (event.target.checked) {
            setCheckedInputs((prevCheckedInputs) => [...prevCheckedInputs, key]);
        } else {
            setCheckedInputs((prevCheckedInputs) => prevCheckedInputs.filter((item) => item !== key));
        }
    };

    useEffect(() => {
        setCurrentList({
            ...currentList,
            ["correlatedGroups"]: checkedInputs,
        });
    }, [checkedInputs]);

    // ! Handle List Update
    const handleSave = async (e, list = null) => {
        e.preventDefault();

        var response = await updateList(list ? list : currentList);
        if (response.error == false) {
            MySwal.fire({
                title: <strong>Updated Successfully</strong>,
                html: <i>{response.message}</i>,
                icon: "success",
            });
        } else if (response.error == true) {
            MySwal.fire({
                title: <strong>Error updating</strong>,
                html: <i>{response.message}</i>,
                icon: "error",
            }).then(() => {
                if (response.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    // ! Handle List Delete
    const handleDeleteAction = async (e) => {
        e.preventDefault();
        var response = await deleteList(currentList.id_wishlist);
        if (response.error == false) {
            setOpenModal(false);
            MySwal.fire({
                title: <strong>{response.message}</strong>,
                html: "",
                icon: "success",
            }).then(() => {
                navigate("/list/");
            });
        } else if (response.error == true) {
            setOpenModal(false);
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

    //! Change the state on params update
    useEffect(() => {
        getCurrentList(params.id);
    }, [params]);

    useEffect(() => {
        getGroupsInfo();
        getCurrentGroupsForList(params.id);
    }, []);

    useEffect(() => {
        setCheckedInputs(predefinedList);
    }, [groups]);

    //! Change the color from currentList
    useEffect(() => {
        setCurrentList({
            ...currentList,
            ["wishlists_prefered_color"]: color,
        });
    }, [color]);

    //! Change the state of list
    const handleChange = (e) => {
        setCurrentList({
            ...currentList,
            [e.target.name]: e.target.value,
        });
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div className="w-screen h-screen flex justify-center">
            <div className="w-3/4 h-5/6 shadow-xl my-auto">
                {/* //! HEADER */}
                <div id="list-header" className="h-[20%] list-header bg-transparent">
                    <div className="w-full h-[25px] flex justify-start items-end">
                        <div
                            className="w-[20%] h-full flex justify-center items-center rounded-bl-lg rounded-br-lg ml-5"
                            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                        >
                            <span
                                className="flex my-auto hover:text-white cursor-pointer"
                                onClick={() => {
                                    navigate("/list/" + currentList.id_wishlist);
                                }}
                            >
                                <FontAwesomeIcon className="my-auto" icon={faArrowLeft} />
                                <p className="ml-2">Back to list</p>
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-full flex justify-center items-center pb-5">
                        <h1 className="text-4xl font-bold">List Settings</h1>
                    </div>
                </div>
                {/* //! Body  */}
                <div className="w-full h-[80%] overflow-auto">
                    <section className="relative flex items-center w-full bg-white md:rounded-md md:px-7 md:py-7">
                        <div className="flex flex-col items-center w-full">
                            <div className="flex flex-col w-full px-3 pt-2 pb-4 md:pb-7 md:pt-4 md:px-8 md:flex-row md:rounded-t-md bg-image-popular-1">
                                <div className="flex flex-col w-full text-black">
                                    <label className="mb-2 md:font-medium">Name your list</label>{" "}
                                    <input
                                        type="text"
                                        name="wishlists_name"
                                        value={currentList.wishlists_name}
                                        onChange={handleChange}
                                        maxLength="255"
                                        autoComplete="off"
                                        required="required"
                                        id="wishlists_name"
                                        className="h-10 mb-3 text-2xl text-black font-display form-input input-inset input-inset-teal"
                                    />{" "}
                                    <label className="mb-2 md:font-medium">Add a note (optional)</label>{" "}
                                    <textarea
                                        name="wishlists_description"
                                        cols="40"
                                        rows="10"
                                        id="wishlists_description"
                                        className="w-full h-10 text-black form-textarea input-inset input-inset-teal"
                                        data-gramm="false"
                                        onChange={handleChange}
                                        value={currentList.wishlists_description}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="relative flex flex-col items-center w-full bg-paper rounded-b-2xl">
                                {/* //! Choose Color */}
                                <div className="flex flex-col items-center w-full mt-5 mb-10">
                                    <h2 className="mb-3 text-xl font-headline md:text-2xl md:mb-7">
                                        Choose your list color
                                    </h2>{" "}
                                    <div className="flex flex-col items-center w-full px-2 md:px-3">
                                        <input type="hidden" name="privacy-banner" value="popular-1" />
                                        <HexColorPicker
                                            color={currentList.wishlists_prefered_color}
                                            onChange={setColor}
                                        />
                                    </div>
                                </div>{" "}
                                {/* //! Who can see this list? */}
                                <div className="flex flex-col items-center w-full pb-8 mt-5 border-gray-200 rounded-md md:mt-10 md:w-10/12 md:border lg:border-none lg:border">
                                    <h2 className="px-5 mb-5 -mt-5 text-xl font-headline md:text-2xl bg-paper">
                                        Who can see this list?
                                    </h2>{" "}
                                    <div className="flex flex-col items-center w-full px-3">
                                        <div className="flex border border-tan-200 rounded-l-md rounded-r-md shadow-mediumGraySolid">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCurrentList({
                                                        ...currentList,
                                                        ["wishlists_privacy"]: 1,
                                                    });
                                                    setCheckedInputs([]);
                                                }}
                                                className="border-r border-tan-200 rounded-l-md focus:shadow-none bg-white"
                                                style={{
                                                    backgroundColor:
                                                        currentList.wishlists_privacy == 1
                                                            ? "rgba(0,0,0,0.3)"
                                                            : "rgba(0,0,0,0)",
                                                }}
                                            >
                                                <span className="flex flex-col items-center w-24 mt-2 mb-2 md:mt-4 md:mb-3 md:w-40">
                                                    <FontAwesomeIcon icon={faLock} />
                                                    <span className="hidden font-medium md:inline">
                                                        private: just you
                                                    </span>
                                                    <span className="flex flex-col md:hidden">
                                                        <h3 className="font-bold">private</h3>
                                                        <p className="text-xs font-medium">just you</p>
                                                    </span>
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCurrentList({
                                                        ...currentList,
                                                        ["wishlists_privacy"]: 2,
                                                    });
                                                }}
                                                className="border-l border-tan-200 rounded-r-md focus:shadow-none bg-white"
                                                style={{
                                                    backgroundColor:
                                                        currentList.wishlists_privacy == 2
                                                            ? "rgba(0,0,0,0.3)"
                                                            : "rgba(0,0,0,0)",
                                                }}
                                            >
                                                <span className="flex flex-col items-center w-24 mt-2 mb-2 md:mt-4 md:mb-3 md:w-40">
                                                    <FontAwesomeIcon icon={faUnlock} />
                                                    <span className="hidden font-medium md:inline">shared: groups</span>
                                                    <span className="flex flex-col md:hidden">
                                                        <h3 className="font-bold">shared</h3>
                                                        <p className="text-xs font-medium">groups</p>
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="flex mt-4 md:mt-8">
                                            <div
                                                className="w-full text-center"
                                                style={{
                                                    display: currentList.wishlists_privacy == 1 ? "block" : "none",
                                                }}
                                            >
                                                <p className="text-sm">
                                                    {" "}
                                                    Examples: gift idea lists for others, reference lists, or even your
                                                    own bucket list.{" "}
                                                </p>
                                            </div>

                                            <div
                                                className="w-full text-center"
                                                style={{
                                                    display: currentList.wishlists_privacy == 2 ? "block" : "none",
                                                }}
                                            >
                                                <p className="text-sm md:px-20">
                                                    {" "}
                                                    Most families choose <strong className="font-bold">
                                                        shared
                                                    </strong>{" "}
                                                    for birthday and holiday wish lists. Group members can view and shop
                                                    this list on Wishy or with the list link if you share it.{" "}
                                                </p>
                                                <div className="flex flex-col items-center mt-8">
                                                    <h2 className="mb-3 text-lg font-headline">Groups shared with</h2>{" "}
                                                    <ul className="flex flex-wrap items-center justify-center">
                                                        {groups.map((group, key) => (
                                                            <li key={key} className="flex items-center mb-2 w-1/4">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`group-checkbox${key}`}
                                                                    name={`group-checkbox${key}`}
                                                                    className="w-6 h-6 text-red-600 border-red-500 form-checkbox hover:cursor-pointer focus:shadow-none"
                                                                    onChange={(event) =>
                                                                        handleCheckboxChange(event, group.id_group)
                                                                    }
                                                                    checked={checkedInputs.includes(group.id_group)}
                                                                />{" "}
                                                                <label
                                                                    htmlFor={`group-checkbox${key}`}
                                                                    className="w-64 ml-3 text-sm font-medium text-left"
                                                                >
                                                                    {group.groups_name}
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>{" "}
                                {/* //! Save amd Cancel Buttons */}
                                <div className="flex justify-center w-full md:mt-10">
                                    <div className="flex flex-col">
                                        <div className="flex justify-center mx-3 mt-5 md:mx-0 md:w-auto md:mt-0 md:mb-10 lg:mt-50 xl:mb-10 md:justify-start lg:mt-5 xl:mt-0 lg:justify-center xl:justify-start">
                                            <button
                                                onClick={handleSave}
                                                className="w-full focus:outline-none text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 md:w-40"
                                            >
                                                <FontAwesomeIcon icon={faFloppyDisk} />
                                                <span className="ml-2 text-white">Save</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full md:w-40 focus:outline-none text-black bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                                                onClick={() => {
                                                    navigate("/list/" + currentList.id_wishlist);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                                <span className="ml-2 text-white">Cancel</span>
                                            </button>
                                            <DeleteConfirmationModal
                                                type="list"
                                                open={openModal}
                                                onClose={handleClose}
                                                onDelete={handleDeleteAction}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* //! Delete List Button  */}
                            <div className="flex justify-center w-full mb-5 md:mb-0">
                                <button
                                    onClick={() => {
                                        setOpenModal(true);
                                    }}
                                    type="button"
                                    className="w-full md:w-40 focus:outline-none text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span className="ml-2 text-white">Delete List</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ListSettings;
