import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";

const AddImageModal = ({ open, onClose, onAdd }) => {
    const [image, setImage] = useState("");

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-confirmation-modal-title"
            aria-describedby="delete-confirmation-modal-description"
            className="flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-6">
                <DialogTitle className="text-lg font-semibold">Add Image</DialogTitle>
                <DialogContent>
                    <div class="mb-4">
                        <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <input
                                id="imageInput"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                name="imageInput"
                                type="text"
                                className="py-1 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="flex justify-end mt-4">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button onClick={() => onAdd(image)} variant="contained" color="error">
                        Add
                    </Button>
                </DialogActions>
            </div>
        </Modal>
    );
};

export default AddImageModal;
