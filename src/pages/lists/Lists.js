// React
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../context/authContext";
// Components
import first_item from "../../assets/first-item.svg";
import "./lists.css";
import Item from "./components/Item";
// API
import { getItems } from "../../api/itemsApi";
import { getList } from "../../api/wishlistsApi";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
// React Pdf
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyWishListPdf from "../../helpers/pdf/MyWishListPdf";

const Lists = () => {
    const MySwal = withReactContent(Swal);
    const { logout } = useContext(AuthContext);
    const [isNewListOpen, setIsNewListOpen] = useState(false);
    const [currentList, setCurrentList] = useState({});
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const getCurrentList = async (id_wishlist) => {
        var response = await getList(id_wishlist);
        if (response.error == false) {
            setCurrentList(response.data[0]);
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

    const getCurrentItems = async (id_wishlist) => {
        var res_items = await getItems(id_wishlist);
        if (res_items.error == false) {
            setItems(res_items.data);
        } else if (res_items.error == true) {
            MySwal.fire({
                title: <strong>{res_items.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (res_items.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    useEffect(() => {
        getCurrentList(params.id);
        getCurrentItems(params.id);
    }, [params]);

    const openNewList = () => {
        setIsNewListOpen(true);
    };

    return (
        <>
            {currentList ? (
                <div className="w-screen h-screen flex justify-center">
                    <div className="w-3/4 h-5/6 shadow-xl my-auto">
                        {/* HEADER */}
                        <div id="list-header" className="h-[20%] list-header bg-transparent">
                            <div className="w-full h-[25px] flex justify-end items-end">
                                <div
                                    className="w-[20%] h-full flex justify-center items-center rounded-bl-lg rounded-br-lg mr-5"
                                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                                >
                                    <span
                                        className="flex my-auto hover:text-white cursor-pointer"
                                        onClick={() => {
                                            navigate("/list/edit/" + currentList.id_wishlist);
                                        }}
                                    >
                                        <FontAwesomeIcon className="my-auto" icon={faGear} />{" "}
                                        <p className="ml-2">Settings</p>
                                    </span>
                                </div>
                            </div>
                            <div className="w-full h-2/6 flex justify-center items-center">
                                <h1 className="text-4xl font-bold">{currentList?.wishlists_name}</h1>
                            </div>

                            <div className="w-full h-14 flex mt-2 bg-transparent">
                                <div className="flex justify-start">
                                    <button
                                        onClick={openNewList}
                                        type="button"
                                        className="text-gray-900 ml-4 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                    >
                                        Add new Item
                                    </button>
                                </div>
                                <div className="flex" style={{ marginLeft: "auto" }}>
                                    <PDFDownloadLink
                                        document={<MyWishListPdf list={currentList} items={items} />}
                                        fileName="MyWishList"
                                    >
                                        {({ loading }) =>
                                            loading ? (
                                                <button
                                                    type="button"
                                                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                                >
                                                    Document Loading..
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                                >
                                                    Download
                                                </button>
                                            )
                                        }
                                    </PDFDownloadLink>

                                    <label
                                        htmlFor="countries"
                                        className="block text-sm font-medium text-gray-900 dark:text-black my-auto"
                                    >
                                        Sort By:
                                    </label>
                                    <select
                                        id="countries"
                                        className="bg-gray-50 mx-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={"Choose"}
                                    >
                                        <option>Stars</option>
                                        <option>Price - High</option>
                                        <option>Price - Low</option>
                                        <option>Item Name</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* ITEMS  */}
                        <div className="w-full h-[80%] overflow-auto">
                            {items?.length > 0 ? (
                                <></>
                            ) : (
                                <div className="h-[22%] text-black pl-10">
                                    <div className="flex items-center">
                                        <img src={first_item} className="w-1/3 lg:w-[150px]" />
                                        <span className="ml-5 text-gray-800">
                                            <h3 className="text-2xl font-bold mb-0 pb-0">Add your first item</h3>
                                            <p className="mt-0 pt-0">
                                                Simply enter a gift name, its web link and the amount.
                                            </p>
                                        </span>
                                        <button
                                            onClick={openNewList}
                                            style={{ marginLeft: "auto" }}
                                            type="button"
                                            className="text-gray-900 mr-10 mb-2 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-800 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                        >
                                            Add new Item
                                        </button>
                                        <br />
                                    </div>
                                </div>
                            )}

                            <div style={{ display: isNewListOpen ? "block" : "none" }}>
                                <Item
                                    item={null}
                                    currentList={currentList}
                                    index={items.length}
                                    key={items.length}
                                    isNew={true}
                                    setIsNewListOpen={setIsNewListOpen}
                                />
                            </div>

                            {items?.map((item, index) => (
                                <Item item={item} currentList={currentList} index={index} key={index} isNew={false} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Lists;
