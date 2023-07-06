import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";

const MembersListsModal = ({ handleOpen, handleClose, user, lists, openList }) => {
    return (
        <Modal
            open={handleOpen}
            onClose={handleClose}
            aria-labelledby="delete-confirmation-modal-title"
            aria-describedby="delete-confirmation-modal-description"
            className="flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-6 w-1/4 overflow-auto max-h-96">
                <DialogTitle className="text-lg font-semibold">{user + " Lists"}</DialogTitle>
                <DialogContent>
                    <div className="space-y-4">
                        {lists.length > 0 ? (
                            lists.map((list, key) => (
                                <button
                                    key={key + Math.random()}
                                    onClick={() => {
                                        openList(list.id_wishlist);
                                    }}
                                    className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                                >
                                    <span className="relative px-5 w-full py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        {list.wishlists_name}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <h1>There are no shared lists yet in this group.</h1>
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

export default MembersListsModal;
