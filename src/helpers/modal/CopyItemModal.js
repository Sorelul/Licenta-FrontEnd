import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
// Context
import { AuthContext } from "../../context/authContext";
// Api
import { addItem } from "../../api/itemsApi";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CopyItemModal = ({ item, open, onClose }) => {
    const MySwal = withReactContent(Swal);
    const { wishlists, getWishlists } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        getWishlists();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedList(e.target.value);
    };

    const copyItem = async (id_wishlist) => {
        var response = await addItem(item, id_wishlist);
        if (response.error == false) {
            onClose();
            MySwal.fire({
                title: <strong>{response.message}</strong>,
                html: "",
                icon: "success",
            }).then(() => {
                navigate("/list/" + id_wishlist);
            });
        } else if (response.error == true) {
            onClose();
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
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-confirmation-modal-title"
            aria-describedby="delete-confirmation-modal-description"
            className="flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-6 w-[500px]">
                <DialogTitle className="text-lg font-semibold">Copy Item</DialogTitle>
                <DialogContent>
                    <div className="space-y-1">
                        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
                            Select Wishlist
                        </label>
                        <select
                            onChange={handleSelectChange}
                            id="dd_wishlists"
                            name="dd_wishlists"
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value={null}>--- Choose a wishlist ---</option>
                            {wishlists.map((wishlist, key) =>
                                wishlist.wishlists_i_got_this == 0 ? (
                                    <option key={key + Math.random()} value={wishlist.id_wishlist}>
                                        {wishlist.wishlists_name}
                                    </option>
                                ) : (
                                    <div key={key + Math.random()}></div>
                                )
                            )}
                        </select>
                    </div>
                </DialogContent>
                <DialogActions className="flex justify-end mt-4">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button onClick={() => copyItem(selectedList)} variant="contained" color="success">
                        Copy
                    </Button>
                </DialogActions>
            </div>
        </Modal>
    );
};

export default CopyItemModal;
