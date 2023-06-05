import React, { useState, useEffect, useContext } from "react";
// React Pdf
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyWishListPdf from "../../helpers/pdf/MyWishListPdf";
// Context
import { AuthContext } from "../../context/authContext";
// Components
import Item from "../lists/components/Item";
// API
import { getOwnedList } from "../../api/wishlistsApi";
import { getItems } from "../../api/itemsApi";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const IGotThisList = () => {
    const MySwal = withReactContent(Swal);
    const [currentList, setCurrentList] = useState({});
    const [items, setItems] = useState([]);
    const { logout } = useContext(AuthContext);

    const getCurrentList = async () => {
        var response = await getOwnedList();
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
        getCurrentList();
    }, []);

    useEffect(() => {
        getCurrentItems(currentList.id_wishlist);
    }, [currentList]);

    return (
        <div className="w-screen h-screen flex justify-center">
            <div className="w-3/4 h-5/6 shadow-xl my-auto">
                {/* HEADER */}
                <div id="list-header" className="h-[20%] list-header bg-transparent">
                    <div className="w-full h-2/6 flex justify-center items-center">
                        <h1 className="text-4xl mt-8 font-bold">I got this List</h1>
                    </div>
                    <div className="w-full h-2/6 flex justify-center items-center">
                        <p className="text-md font-bold mt-8">
                            Once you mark an item "I got this" Wishy saves it here. Only you can view this list.
                        </p>
                    </div>

                    <div className="w-full h-14 flex mt-2 bg-transparent" style={{ marginTop: "-20px" }}>
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
                                            Download
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
                        </div>
                    </div>
                </div>
                {/* ITEMS  */}
                <div className="w-full h-[80%] overflow-auto">
                    {items?.map((item, index) => (
                        <Item item={item} currentList={currentList} index={index} key={index} isNew={false} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IGotThisList;
