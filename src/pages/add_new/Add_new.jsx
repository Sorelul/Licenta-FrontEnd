import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { HexColorPicker } from "react-colorful";
import { AuthContext } from "../../context/authContext";

const Add_new = () => {
    const [color, setColor] = useState("#003AFF");
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const [showError, setShowError] = useState(false);
    const { currentUser, logout } = useContext(AuthContext);
    const MySwal = withReactContent(Swal);

    const handleClick = async (e) => {
        e.preventDefault();

        if (name == "") {
            nameRef.current.focus();
            setShowError(true);
            return;
        }
        const user_id = currentUser.id_user;
        try {
            const res = await axios.post("/wishlist/", {
                wishlists_user_id: user_id,
                wishlists_name: name,
                wishlists_description: note,
                wishlists_prefered_color: color,
            });

            if (res.status == 200) {
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Your list has been created!</i>,
                    icon: "success",
                }).then(() => {
                    navigate("/list");
                });
            }
        } catch (e) {
            if (e.response.data.message == "Unauthorized!") {
                MySwal.fire({
                    title: <strong>You are not authorized</strong>,
                    html: <i>You will be disconnected!</i>,
                    icon: "error",
                }).then(() => {
                    logout();
                });
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute opacity-60 inset-0 z-0"></div>
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">Create a new list</h2>
                    <p className="mt-2 text-sm text-gray-400">Give it a cool name, it can be changed later!</p>
                    <p className={showError ? "mt-2 text-sm text-red-500" : "mt-2 text-sm text-red-500 hidden"}>
                        Please enter a name for your list before creating it.
                    </p>
                </div>
                <div className="mt-8 space-y-3" action="#" method="POST">
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Name your list</label>
                        <input
                            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            type="text"
                            value={name}
                            ref={nameRef}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Add a note (optional)</label>
                        <input
                            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <h2 className="text-center">
                        <label className="text-xl font-bold text-gray-500 tracking-wide">
                            Choose a color for your wishlist
                        </label>
                    </h2>
                    <div className="flex justify-center">
                        <HexColorPicker color={color} onChange={setColor} />
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleClick}
                            className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                        >
                            Create List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add_new;
