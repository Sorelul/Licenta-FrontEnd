import React from "react";

const ContextMenu = ({ buttonRef, onClose, onRemoveClick, onSendEmailClick }) => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const contextMenuStyle = {
        position: "absolute",
        top: buttonRect.bottom,
        left: buttonRect.right,
        background: "black",
        borderRadius: "20px",
        padding: "10px",
        border: "1px solid #ccc",
    };

    return (
        <div style={contextMenuStyle}>
            <ul>
                <li onClick={onRemoveClick}>
                    <button
                        type="button"
                        class="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Remove Member
                    </button>
                </li>
                <li onClick={onSendEmailClick}>
                    <button
                        type="button"
                        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
                    >
                        Send Email
                    </button>
                </li>
                <li onClick={onClose}>
                    <button
                        type="button"
                        class="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Close
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ContextMenu;
