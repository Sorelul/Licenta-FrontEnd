import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Modal, Backdrop, Fade } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { makeStyles } from "@mui/material";

const DeleteConfirmationModal = ({ type, open, onClose, onDelete }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-confirmation-modal-title"
            aria-describedby="delete-confirmation-modal-description"
            className="flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-6">
                <DialogTitle className="text-lg font-semibold">
                    {type == "list" ? "Wishlist" : "Item"} Delete
                </DialogTitle>
                <DialogContent>
                    <p className="text-gray-600">
                        Are you sure you want to delete this {type == "list" ? "wishlist" : "item"} ?
                    </p>
                </DialogContent>
                <DialogActions className="flex justify-end mt-4">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button onClick={onDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;
