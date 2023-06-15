import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";

const AddNewUserModal = ({ open, onClose, onAdd }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-confirmation-modal-title"
            aria-describedby="delete-confirmation-modal-description"
            className="flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-6">
                <DialogTitle className="text-lg font-semibold">Add new user to your group</DialogTitle>
                <DialogContent>
                    <div className="mb-4">
                        <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 flex items-center">
                            <input
                                id="emailInput"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="emailInput"
                                required
                                type="email"
                                className="py-1 px-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="mt-1 flex items-center w-full">
                            <input
                                id="nameInput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="nameInput"
                                type="text"
                                required
                                className="py-1 w-full px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="flex justify-end mt-4">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button onClick={() => onAdd({ email, name })} variant="contained" color="error">
                        Add
                    </Button>
                </DialogActions>
            </div>
        </Modal>
    );
};

export default AddNewUserModal;
