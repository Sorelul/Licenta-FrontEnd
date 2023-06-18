import React from "react";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";

const NotificationsModal = ({ handleOpen, handleClose, handleDelete, notifications }) => {
    return (
        <Modal
            open={handleOpen}
            onClose={handleClose}
            aria-labelledby="delete-confirmation-modal-title"
            aria-describedby="delete-confirmation-modal-description"
            className="flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-6 w-1/4">
                <DialogTitle className="text-lg font-semibold">Notifications</DialogTitle>
                <DialogContent>
                    <div class="space-y-4">
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div class="bg-gray-100 p-2 rounded-md flex items-center justify-between" key={index}>
                                    <div>
                                        <h3 class="text-lg font-bold">{notification.notifications_source}</h3>
                                        <p class="text-gray-500">{notification.notifications_message}</p>
                                    </div>
                                    <button
                                        class="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(notification.id_notification)}
                                    >
                                        <svg
                                            class="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3 5.99988H5H21"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8 5.99988V3.99988C8 3.46988 8.21071 2.96052 8.58579 2.58544C8.96086 2.21037 9.47021 1.99988 10 1.99988H14C14.5298 1.99988 15.0391 2.21037 15.4142 2.58544C15.7893 2.96052 16 3.46988 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5298 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5298 21.9999 17 21.9999H7C6.47021 21.9999 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5298 5 19.9999V5.99988H19Z"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="mt-5">
                                <h2>No notifications</h2>
                            </div>
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

export default NotificationsModal;
