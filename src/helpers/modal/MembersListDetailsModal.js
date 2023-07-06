import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
// Context
import { AuthContext } from "../../context/authContext";
import { getList } from "../../api/wishlistsApi";
import { getItems } from "../../api/itemsApi";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Item from "../../pages/lists/components/Item";

const MembersListDetailsModal = ({ handleOpen, handleClose, id_list }) => {
    const { logout } = useContext(AuthContext);
    const MySwal = withReactContent(Swal);
    const [currentList, setCurrentList] = useState({});
    const [items, setItems] = useState([]);

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
        getCurrentList(id_list);
        getCurrentItems(id_list);
    }, [id_list]);

    return (
        <Modal
            open={handleOpen}
            onClose={handleClose}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
            className="flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-6 w-1/2 overflow-auto max-h-96">
                <DialogTitle className="text-lg font-semibold">{currentList?.wishlists_name}</DialogTitle>
                <DialogContent>
                    <div className="space-y-4">
                        {items ? (
                            items.map((item, key) => (
                                <div className="w-full border shadow-sm bg-gray-800 text-white flex p-2 pl-5 pr-5 rounded-full">
                                    <div className="w-1/6"> {item?.items_name ? item?.items_name : "Dummy list"}</div>
                                    <div className="flex justify-around w-5/6">
                                        <div> Rank: {item?.items_ranking ? item?.items_ranking : "No Ranking"}</div>
                                        <div> Price: {item?.items_price ? item?.items_price + "$" : "No price"}</div>
                                        <div>
                                            {" "}
                                            Quantity: {item?.items_quantity ? item?.items_quantity : "No quantity"}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>This list has no items.</h1>
                        )}
                    </div>
                </DialogContent>
                <DialogActions className="flex justify-end mt-4">
                    <Button onClick={handleClose} className="mr-2">
                        Close
                    </Button>
                </DialogActions>
            </div>
        </Modal>
    );
};

export default MembersListDetailsModal;
