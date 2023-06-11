import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Image
import JoinImg from "../../../assets/join.svg";
// SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Context
import { AuthContext } from "../../../context/authContext";
// Api
import { addUserToGroup } from "../../../api/groupsApi";
// Fa Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const JoinGroup = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const { logout } = useContext(AuthContext);
    const [code, setCode] = useState("");

    // ! Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        //? Validate code length.
        if (code.length != 15) {
            MySwal.fire({
                title: <strong>Wrong Code</strong>,
                html: <i>The Code must have 15 chars.</i>,
                icon: "error",
            }).then(() => {
                return;
            });
        }
        //? Validate code.
        checkCode(code);
    };

    //! Check code
    const checkCode = async (code) => {
        const response = await addUserToGroup(code);
        if (response?.error == false) {
            navigate("groups/" + response?.id_group);
        } else {
            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
                return false;
            });
        }
    };

    return (
        <>
            <div className="flex justify-center md:py-6 md:bg-tan-200 lg:px-8">
                <main
                    id="main"
                    className="flex flex-col flex-grow w-full md:min-h-full lg:px-0 lg:w-90 bg-transparent order-2 min-h-screenmt-12 md:px-4 lg:mt-[5%] lg:mb-[5%] mt-6 max-w-screen-xl"
                >
                    <section className="flex flex-col items-center bg-yellow-600 pb-7 md:pb-9 py-9 bg-pattern-presents-yellow-light md:rounded-t">
                        <span className="flex md:mb-5">
                            <img style={{ width: "80px" }} src={JoinImg} className="mr-3 w-7 md:mr-6 md:w-9" />{" "}
                            <h1 className="text-2xl font-headline md:text-4xl pt-4">Join a group</h1>
                        </span>{" "}
                        <p className="w-full px-4 text-sm font-medium text-center md:w-1/2 md:text-base">
                            Enter the code provided by the adminstrator of the group to join.
                        </p>
                    </section>
                    <section className="relative w-full text-center p-5 lg:pt-24 lg:pb-24 bg-white md:rounded-b-md md:px-7 md:py-7 shadow-xl border-black">
                        <form className="w-[50%] mx-auto">
                            <h1 className="text-2xl mb-10">One step away from joining your group &#128540;</h1>
                            <label
                                for="default-search"
                                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FontAwesomeIcon icon={faSearch} className="text-gray-500" size="lg" />
                                </div>
                                <input
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    type="search"
                                    id="default-search"
                                    class="block w-full p-4 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Type here your code"
                                    required
                                />
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Join
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </>
    );
};

export default JoinGroup;
