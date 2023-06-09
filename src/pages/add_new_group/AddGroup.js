import React, { useState, useContext, useEffect } from "react";
// Images
import AddGroupImg from "../../assets/add_group.svg";
// SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Context
import { AuthContext } from "../../context/authContext";
import Tooltip from "@mui/material/Tooltip";

const AddGroup = () => {
    const MySwal = withReactContent(Swal);
    const [groupName, setGroupName] = useState("");
    const { currentUser } = useContext(AuthContext);

    // ! Inputs Handlers
    const [inputPairs, setInputPairs] = useState([
        { name: "", email: "" },
        { name: "", email: "" },
    ]);

    useEffect(() => {
        const lastPair = inputPairs[inputPairs.length - 1];
        if (lastPair.email !== "") {
            setInputPairs([...inputPairs, { name: "", email: "" }]);
        }
    }, [inputPairs]);

    const handleInputChange = (index, field, value) => {
        const updatedPairs = [...inputPairs];
        updatedPairs[index][field] = value;
        setInputPairs(updatedPairs);
    };
    // ! End Inputs Handler

    // ! Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        //? Validate group name length.
        if (groupName.length <= 3) {
            MySwal.fire({
                title: <strong>Incomplete form</strong>,
                html: <i>The group name must have at least 3 letters.</i>,
                icon: "error",
            }).then(() => {
                return;
            });
        }

        //? Check for incomplete name fields without a corresponding email.
        const hasIncompletePair = inputPairs.some(
            (pair) => (pair.name !== "" && pair.email === "") || (pair.email !== "" && pair.name === "")
        );

        if (!hasIncompletePair) {
            //? First we create an empty group with the given name.
        } else {
            MySwal.fire({
                title: <strong>Incomplete form</strong>,
                html: <i>Please enter all fields</i>,
                icon: "error",
            });
        }
    };

    return (
        <>
            <div className="flex justify-center md:py-6 md:bg-tan-200 lg:px-8">
                <main
                    id="main"
                    className="flex flex-col flex-grow w-full md:min-h-full lg:px-0 lg:w-90 bg-transparent order-2 min-h-screenmt-12 md:px-4 lg:mt-0 mt-6 max-w-screen-xl"
                >
                    <section className="flex flex-col items-center bg-yellow-600 pb-7 md:pb-9 py-9 bg-pattern-presents-yellow-light md:rounded-t">
                        <span className="flex md:mb-5">
                            <img style={{ width: "80px" }} src={AddGroupImg} className="mr-3 w-7 md:mr-6 md:w-9" />{" "}
                            <h1 className="text-2xl font-headline md:text-4xl pt-2">Start a group</h1>
                        </span>{" "}
                        <p className="w-full px-4 text-sm font-medium text-center md:w-1/2 md:text-base">
                            Invite at least one other person to share and shop each other’s wish lists (with 2+
                            members).
                        </p>
                    </section>
                    <section className="relative w-full p-5 bg-white md:rounded-b-md md:px-7 md:py-7 shadow-xl border-black">
                        <form method="post" className="flex flex-col items-center w-full">
                            <div className="flex flex-col items-center w-full mb-8">
                                <label for="id_title" className="mb-1 text-xl font-headline md:mb-7">
                                    Name your group
                                </label>
                                <input
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    type="text"
                                    name="groupName"
                                    maxlength="100"
                                    placeholder="Visible to your group (eg. Smith Family)"
                                    required="required"
                                    className="font-medium md:w-1/2 form-input"
                                />
                            </div>
                            <label
                                for="id_invites"
                                id="invite_label"
                                className="flex items-center mb-1 ml-5 text-xl font-headline md:mb-6"
                            >
                                <span>Invite members</span>
                                <span>
                                    <Tooltip title="Additional rows appear as needed." placement="right">
                                        <a title="help for this function">
                                            <svg
                                                viewBox="0 0 18 18"
                                                alt="Help Button"
                                                className="w-5 h-5 text-teal-700 ml-3"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M9 0C4.028 0 0 4.029 0 9a9 9 0 109-9zm0 3.318a1.404 1.404 0 110 2.807 1.404 1.404 0 010-2.807zm0 3.741c.342 0 .684.137.924.37.24.234.378.56.374.889v5.105c.004.33-.136.661-.38.895a1.341 1.341 0 01-1.848-.013 1.229 1.229 0 01-.368-.883V8.317a1.23 1.23 0 01.374-.889c.24-.233.58-.37.923-.37v.001z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </Tooltip>
                                </span>
                            </label>{" "}
                            <p className="text-sm text-center md:text-base md:font-medium mb-10">
                                Invite any number of members now (or later, too).{" "}
                                <span className="md:hidden">Additional rows appear as needed.</span>
                            </p>{" "}
                            <div className="w-full md:w-1/2">
                                <div className="flex flex-col mb-5 ml-3 font-medium text-gray-500 md:items-center md:flex-row">
                                    <div className="flex items-center md:w-1/2">
                                        <p className="pl-2 -mt-4 overflow-hidden truncate md:mt-0">
                                            {currentUser.users_username}
                                        </p>
                                    </div>{" "}
                                    <div className="flex md:w-1/2">
                                        <p className="ml-12 -mt-4 overflow-hidden text-sm truncate md:pl-4 md:ml-0 md:text-base md:mt-0">
                                            {currentUser.users_email}
                                        </p>
                                    </div>
                                </div>{" "}
                                <div className="flex flex-col w-full">
                                    {inputPairs.map((pair, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col px-2 pb-2 mb-5 rounded-md md:px-0 md:pb-0 md:flex-row last:mb-0 md:hover:bg-transparent hover:bg-tan-200"
                                        >
                                            <div className="flex flex-col w-full md:w-1/2">
                                                <input
                                                    value={pair.name}
                                                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                                    placeholder="Full name"
                                                    type="text"
                                                    className="mr-1 font-medium md:mr-4 form-input"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full md:pl-3 md:w-1/2">
                                                <input
                                                    value={pair.email}
                                                    onChange={(e) => handleInputChange(index, "email", e.target.value)}
                                                    placeholder="Email address"
                                                    type="email"
                                                    className="font-medium form-input"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>{" "}
                            <div className="flex mt-5 md:mt-10">
                                <button
                                    type="button"
                                    className="w-full md:w-40 focus:outline-none text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                                >
                                    <span className=" text-white">Save group &amp; invite</span>
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </>
    );
};

export default AddGroup;
