import React, { useEffect, useState, useContext } from "react";
// Modal
import DeleteConfirmationModal from "../../../helpers/modal/DeleteConfirmationModal";
import AddImageModal from "../../../helpers/modal/AddImageModal";
// react-router-dom
import { useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../../context/authContext";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// Accordion MUI
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Api
import { updateItem, addItem, getItem, deleteItem, moveItem } from "../../../api/itemsApi";
import { getOwnedList } from "../../../api/wishlistsApi";
// CSS
import "./Item.css";

const Item = ({ item, currentList, index, isNew, setIsNewListOpen }) => {
    const MySwal = withReactContent(Swal);
    const { logout } = useContext(AuthContext);
    const [ownedList, setOwnedList] = useState({});

    const navigate = useNavigate();

    // ! Confirmation modal state & methods
    const [openModal, setOpenModal] = useState(false);
    const [openImageModal, setOpenImageModal] = useState(false);

    const handleDelete = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleImageClose = () => {
        setOpenImageModal(false);
    };

    // ! Accordion setup
    const [expanded, setExpanded] = useState(false);
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // ! Initial Item State
    const item_state = {
        id_item: item?.id_item ? item?.id_item : "",
        items_link: item?.items_link ? item?.items_link : "",
        items_name: item?.items_name ? item?.items_name : "",
        items_quantity: item?.items_quantity ? item?.items_quantity : 0,
        items_ranking: item?.items_ranking ? item?.items_ranking : "",
        items_price: item?.items_price ? item?.items_price : 0,
        items_shop: item?.items_shop ? item?.items_shop : "",
        items_description: item?.items_description ? item?.items_description : "",
        items_image: item?.items_image ? item?.items_image : "",
    };
    // ! Items details in accordion body
    const [itemState, setItemState] = useState(item_state);
    // ! Items details in accordion header
    const [initialItemState, setInitialItemState] = useState(item_state);

    useEffect(() => {
        setItemState(item_state);
        setInitialItemState(item_state);
        getOwnedListMethod();
    }, [item]);

    const getUpdatedItem = async () => {
        var response = await getItem(itemState.id_item);
        if (response.error == false) {
            setInitialItemState(response.data[0]);
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

    // ! Handle ItemState Change
    const handleChange = (e) => {
        setItemState({
            ...itemState,
            [e.target.name]: e.target.value,
        });
    };

    // ! Handle Item Update
    const handleSave = async (e = null, item = null) => {
        if (e) {
            e.preventDefault();
        }
        (itemState.quantity < 0 || itemState.price < 0) &&
            MySwal.fire({
                title: <strong>Quantity and price must be positive numbers</strong>,
                html: "",
                icon: "error",
            });
        var response = await updateItem(item ? item : itemState);
        if (response.error == false) {
            MySwal.fire({
                title: <strong>{response.message}</strong>,
                html: "",
                icon: "success",
            }).then(() => {
                getUpdatedItem();
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

    // ! Handle Item Add
    const handleAdd = async (e) => {
        e.preventDefault();

        if (itemState.name == "") {
            MySwal.fire({
                title: <strong>Name is required</strong>,
                html: "",
                icon: "error",
            });
        }

        (itemState.quantity < 0 || itemState.price < 0) &&
            MySwal.fire({
                title: <strong>Quantity and price must be positive numbers</strong>,
                html: "",
                icon: "error",
            });

        var response = await addItem(itemState, currentList.id_wishlist);
        if (response.error == false) {
            MySwal.fire({
                title: <strong>{response.message}</strong>,
                html: "",
                icon: "success",
            }).then(() => {
                handleCancel();
                navigate("/list/" + currentList.id_wishlist);
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

    // ! Handle Item Delete
    const handleDeleteAction = async (e) => {
        e.preventDefault();
        var response = await deleteItem(itemState.id_item);
        if (response.error == false) {
            setOpenModal(false);
            MySwal.fire({
                title: <strong>{response.message}</strong>,
                html: "",
                icon: "success",
            }).then(() => {
                navigate("/list/" + currentList.id_wishlist);
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

    const handleImageAdd = (image) => {
        setItemState({
            ...itemState,
            ["items_image"]: image,
        });
        const newItem = {
            ...itemState,
        };
        newItem.items_image = image;

        handleSave(null, newItem);
        setOpenImageModal(false);
    };

    // ! Handle New Item Cancel
    const handleCancel = () => {
        setIsNewListOpen(false);
    };

    const getOwnedListMethod = async () => {
        var response = await getOwnedList();
        if (response.error == false) {
            setOwnedList(response.data[0]);
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

    const handleMove = async () => {
        if (ownedList?.id_wishlist) {
            var response = await moveItem(itemState.id_item, ownedList.id_wishlist);
            if (response.error == false) {
                MySwal.fire({
                    title: <strong>{response.message}</strong>,
                    html: "",
                    icon: "success",
                }).then(() => {
                    navigate("/list/i-got-this");
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
        } else {
            MySwal.fire({
                title: <strong>There is no "I got this" list!</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                return;
            });
        }
    };

    return (
        <div>
            <Accordion expanded={expanded === `panel${index}`} onChange={handleChangeAccordion(`panel${index}`)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {initialItemState?.items_name ? initialItemState?.items_name : "Dummy list"}
                    </Typography>
                    <Typography className="flex w-2/3" sx={{ color: "text.secondary" }}>
                        <span className="w-1/3">
                            Rank: {initialItemState?.items_ranking ? initialItemState?.items_ranking : "No Ranking"}
                        </span>
                        <span className="w-1/3">
                            Price: {initialItemState?.items_price ? initialItemState?.items_price : "No price"}
                        </span>

                        <span className="w-1/3">
                            Quantity:{" "}
                            {initialItemState?.items_quantity ? initialItemState?.items_quantity : "No quantity"}
                        </span>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-200 dark:bg-gray-100">
                        <div className="flex md:px-7 md:py-9 flex-row text-black">
                            <div className="flex flex-col w-full md:flex-row">
                                {/*// ! Stanga */}
                                <div className="flex flex-col w-full">
                                    {/*// ! Web Link + Name */}
                                    <div
                                        className="flex flex-col w-full px-5 py-5 rounded-md md:px-10 md:pt-7 md:pb-10"
                                        style={{
                                            backgroundColor: currentList.wishlists_prefered_color,
                                        }}
                                    >
                                        <label className="mb-2 font-medium text-white">Web link</label>
                                        <input
                                            type="text"
                                            className="rounded-md title form-input text-black"
                                            value={itemState?.items_link}
                                            name="items_link"
                                            onChange={handleChange}
                                        />

                                        <label className="mt-6 mb-2 font-medium text-white">Gift name*</label>
                                        <input
                                            type="text"
                                            size="40"
                                            className="rounded-md title form-input text-black"
                                            value={itemState?.items_name}
                                            name="items_name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*// ! Rating  + Price + Quantity*/}
                                    <div className="flex flex-col mt-7">
                                        <div className="flex px-3 mb-5 md:px-0">
                                            {/*// ! Rating */}
                                            <span className="flex flex-col w-1/3 justify-center items-center">
                                                <label className="mr-5 font-medium md:mr-0">Ranking </label>
                                                <input
                                                    type="text"
                                                    size="10"
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    className="rounded-md form-input text-black mt-1 w-1/2"
                                                    value={itemState?.items_ranking}
                                                    name="items_ranking"
                                                    onChange={handleChange}
                                                />
                                            </span>
                                            {/*// ! Price */}
                                            <span className="flex flex-col w-1/3 justify-center items-center">
                                                <label className="font-medium">Price</label>
                                                <input
                                                    type="text"
                                                    size="10"
                                                    className="rounded-md form-input text-black mt-1 w-1/2"
                                                    value={itemState?.items_price}
                                                    name="items_price"
                                                    onChange={handleChange}
                                                />
                                            </span>
                                            {/*// ! Quantity  */}
                                            <span className="flex flex-col w-1/3 justify-center items-center">
                                                <label className="font-medium">How many?</label>
                                                <span className="flex mt-2 md:mt-0">
                                                    <div className="flex items-center mt-1">
                                                        <button
                                                            onClick={() => {
                                                                var counter = itemState?.items_quantity;
                                                                if (counter > 0) {
                                                                    counter--;
                                                                }
                                                                setItemState({
                                                                    ...itemState,
                                                                    ["items_quantity"]: counter,
                                                                });
                                                            }}
                                                            className="z-10 w-10 h-full -mr-1 text-white rounded-l bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:shadow-none"
                                                        >
                                                            {" "}
                                                            —{" "}
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className="w-16 m-0 text-center rounded-none form-input text-black"
                                                            value={itemState?.items_quantity}
                                                            name="items_quantity"
                                                            min="0"
                                                            onChange={handleChange}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                var counter = itemState?.items_quantity;
                                                                counter++;
                                                                setItemState({
                                                                    ...itemState,
                                                                    ["items_quantity"]: counter,
                                                                });
                                                            }}
                                                            className="z-10 w-10 h-full -ml-1 text-white rounded-r bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:shadow-none"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {/*// ! Shop */}
                                    <div className="flex flex-col px-3 mb-5 md:px-0">
                                        <label className="mb-2 font-medium">Where to buy</label>
                                        <input
                                            type="text"
                                            size="40"
                                            className="rounded-md form-input text-black mt-1"
                                            value={itemState?.items_shop}
                                            name="items_shop"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/*// ! Description */}
                                    <div className="flex flex-col px-3 mb-5 md:px-0">
                                        <label className="mb-2 font-medium">Description</label>
                                        <textarea
                                            size="30"
                                            className="h-20 md:h-32 form-input rounded-md text-black mt-1"
                                            value={itemState?.items_description}
                                            name="items_description"
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    {/*// ! Buttons */}
                                    <div className="flex flex-col">
                                        <div className="flex justify-center mx-3 mt-5 md:mx-0 md:w-auto md:mt-0 md:mb-10 lg:mt-50 xl:mb-10 md:justify-start lg:mt-5 xl:mt-0 lg:justify-center xl:justify-start">
                                            <button
                                                onClick={isNew ? handleAdd : handleSave}
                                                className="w-full focus:outline-none text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 md:w-40"
                                            >
                                                <FontAwesomeIcon icon={faFloppyDisk} />
                                                <span className="ml-2 text-white">{isNew ? "Add" : "Save"}</span>
                                            </button>
                                            <button
                                                onClick={isNew ? handleCancel : handleDelete}
                                                type="button"
                                                className="w-full md:w-40 focus:outline-none text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                                <span className="ml-2 text-white">{isNew ? "Cancel" : "Delete"}</span>
                                            </button>
                                            <DeleteConfirmationModal
                                                type="item"
                                                open={openModal}
                                                onClose={handleClose}
                                                onDelete={handleDeleteAction}
                                            />
                                            <AddImageModal
                                                open={openImageModal}
                                                onClose={handleImageClose}
                                                onAdd={handleImageAdd}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* // ! Dreapta */}
                                <div className="flex-col items-center hidden md:flex lg:hidden xl:flex md:pl-12">
                                    <div className="flex flex-col justify-center md:w-40 xl:w-60 ">
                                        <div className="relative">
                                            {itemState.items_image ? (
                                                <div class="img__wrap">
                                                    <img
                                                        src={itemState.items_image}
                                                        className="object-cover rounded-md w-60 h-60 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-60 xl:h-60"
                                                    />
                                                    <div
                                                        class="img__description_layer"
                                                        onClick={() => {
                                                            setOpenImageModal(true);
                                                        }}
                                                    >
                                                        <p class="img__description">Click to Change Image</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <a
                                                    onClick={() => {
                                                        setOpenImageModal(true);
                                                    }}
                                                    className="flex items-center justify-center w-32 h-32 border  border-dashed rounded-md cursor-pointer md:w-40 md:h-40 xl:w-60 xl:h-60"
                                                    style={{
                                                        borderColor: currentList.wishlists_prefered_color,
                                                    }}
                                                >
                                                    <span className="font-medium text-red-600">Add image</span>
                                                </a>
                                            )}
                                        </div>
                                        {isNew ? (
                                            ""
                                        ) : (
                                            <>
                                                <button
                                                    title="Copy itemState to another list"
                                                    className="focus:outline-none text-black bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:focus:ring-gray-900"
                                                >
                                                    <FontAwesomeIcon icon={faCopy} />
                                                    <span className="ml-2">Copy item</span>
                                                </button>
                                                {currentList?.wishlists_i_got_this == 0 ? (
                                                    <button
                                                        onClick={handleMove}
                                                        title=" Delete and move itemState to I Got This list "
                                                        className="focus:outline-none text-black bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-gray-900"
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} />
                                                        <span className="ml-2">I got this</span>
                                                    </button>
                                                ) : (
                                                    <></>
                                                )}

                                                <p className="mt-8 italic font-medium text-center">
                                                    Added on{" "}
                                                    {new Date(item?.items_added).toLocaleDateString("en-US", {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Item;
