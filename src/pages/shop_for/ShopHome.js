import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { getGroupMembers } from "../../api/groupsApi";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import noAvatar from "../../assets/noAvatar.jpg";
import { getWishlistsForUserFromGroup } from "../../api/wishlistsApi";
import MembersListsModal from "../../helpers/modal/MembersListsModal";
import MembersListDetailsModal from "../../helpers/modal/MembersListDetailsModal";

const ShopHome = () => {
    const { groups, getGroupsInfo, logout } = useContext(AuthContext);
    const [selectedGroup, setSelectedGroup] = useState();
    const [groupMembers, setGroupMembers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [membersLists, setMembersLists] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const MySwal = withReactContent(Swal);

    // Second modal
    const [isListModalOpen, setListModalOpen] = useState(false);
    const [listSelected, setListSelected] = useState();

    const openList = (id_wishlist) => {
        setListSelected(id_wishlist);
        setIsModalOpen(false);
        setListModalOpen(true);
    };

    useEffect(() => {
        getGroupsInfo();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedGroup(e.target.value);
    };

    useEffect(() => {
        getMembers(selectedGroup);
    }, [selectedGroup]);

    const getMembers = async (id_group) => {
        const response = await getGroupMembers(id_group);
        if (response?.error == false) {
            if (response) {
                setGroupMembers(response.data);
            } else {
                MySwal.fire({
                    title: <strong>No member returned</strong>,
                    html: "",
                    icon: "error",
                }).then(() => {
                    return null;
                });
            }
        } else {
            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    const openMembersListsModal = async (id_user, username) => {
        const response = await getWishlistsForUserFromGroup(id_user, selectedGroup);
        if (response?.error == false) {
            if (response) {
                setSelectedUser(username);
                setMembersLists(response.data);
                setIsModalOpen(true);
            } else {
                MySwal.fire({
                    title: <strong>No lists returned</strong>,
                    html: "",
                    icon: "error",
                }).then(() => {
                    return null;
                });
            }
        } else {
            MySwal.fire({
                title: <strong>{response?.message}</strong>,
                html: "",
                icon: "error",
            }).then(() => {
                if (response?.errorCode == 1) {
                    logout();
                }
            });
        }
    };

    return (
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6 min-h-[700px]">
            <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Choose one group</h2>
                <select
                    id="selected-group"
                    onChange={handleSelectChange}
                    class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected disabled>
                        Your groups right here
                    </option>
                    {groups.map((group, key) => (
                        <option key={key + Math.random()} value={group.id_group}>
                            {group.groups_name}
                        </option>
                    ))}
                </select>
                <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400 mt-2">
                    Pick one of your favorite groups and get to know what they desire.
                </p>
            </div>
            <MembersListsModal
                handleOpen={isModalOpen}
                handleClose={() => setIsModalOpen(!isModalOpen)}
                user={selectedUser}
                lists={membersLists}
                openList={openList}
            />

            <MembersListDetailsModal
                handleOpen={isListModalOpen}
                handleClose={() => setListModalOpen(!isListModalOpen)}
                id_list={listSelected}
            />
            <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {groupMembers.length !== 0 ? (
                    groupMembers.map((group, key) => (
                        <div key={key + Math.random()} class="text-center text-gray-500 dark:text-gray-400">
                            <img
                                class="mx-auto mb-4 w-36 h-36 rounded-full hover:scale-105 transition duration-300 cursor-pointer"
                                onClick={() => {
                                    openMembersListsModal(group.id_user, group.users_username);
                                }}
                                src={group.users_profile_image ? group.users_profile_image : noAvatar}
                                alt="User Avatar"
                            />
                            <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
                                <a href="#">{group.users_username}</a>
                            </h3>
                            <p>{group.users_email}</p>
                            <ul class="flex justify-center mt-4 space-x-4"></ul>
                        </div>
                    ))
                ) : selectedGroup ? (
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        There are no members in this group yet.
                    </h2>
                ) : (
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">No group selected.</h2>
                )}
            </div>
        </div>
    );
};

export default ShopHome;
