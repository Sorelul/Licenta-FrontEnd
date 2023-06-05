import React from "react";

const AddGroup = () => {
    return (
        <>
            <div class="flex justify-center md:py-6 md:bg-tan-200 lg:px-8">
                <main
                    id="main"
                    class="flex flex-col flex-grow w-full md:min-h-full lg:px-0 lg:w-90 bg-transparent order-2 min-h-screenmt-12 md:px-4 lg:mt-24 mt-12 lg:mt-24 max-w-screen-xl"
                >
                    <section class="flex flex-col items-center bg-yellow-600 pb-7 md:pb-9 py-9 bg-pattern-presents-yellow-light md:rounded-t">
                        <span class="flex md:mb-5">
                            <img
                                width="28"
                                height="28"
                                src="/public/assets/img/icons/group-gradient.svg"
                                class="mr-3 w-7 md:mr-6 md:w-9"
                            />{" "}
                            <h1 class="text-2xl font-headline md:text-4xl">Start a group</h1>
                        </span>{" "}
                        <p class="w-full px-4 text-sm font-medium text-center md:w-1/2 md:text-base">
                            Invite at least one other person to share and shop each other’s wish lists or to start a
                            Secret Santa Drawing (with 3+ members).
                        </p>
                    </section>{" "}
                    <section class="relative w-full p-5 bg-white md:rounded-b-md md:px-7 md:py-7">
                        <form method="post" class="flex flex-col items-center w-full">
                            <input
                                type="hidden"
                                name="csrfmiddlewaretoken"
                                value="7iolkAEuztyGPkVPW0Cei6wxTBCOiUmRi9dyu9MObbRhfSDuWpBhzfYVVfCfNj9c"
                            />{" "}
                            <div class="flex flex-col items-center w-full mb-8">
                                <label for="id_title" class="mb-1 text-xl font-headline md:mb-7">
                                    Name your group
                                </label>{" "}
                                <input
                                    type="text"
                                    name="title"
                                    maxlength="100"
                                    placeholder="Visible to your group (eg. Smith Family)"
                                    required="required"
                                    id="id_title"
                                    class="font-medium md:w-1/2 form-input"
                                />
                            </div>{" "}
                            <label
                                for="id_invites"
                                id="invite_label"
                                class="flex items-center mb-1 ml-5 text-xl font-headline md:mb-6"
                            >
                                <span>Invite members</span>{" "}
                                <span>
                                    <a
                                        title="help for this function"
                                        href="#"
                                        onclick="Beacon('open'); Beacon('article', '5e8f73d204286364bc981ee8');return false;"
                                        class="beacon-help"
                                    >
                                        <svg viewBox="0 0 18 18" alt="Help Button" class="w-5 h-5 text-teal-700 ml-3">
                                            <path
                                                fill="currentColor"
                                                d="M9 0C4.028 0 0 4.029 0 9a9 9 0 109-9zm0 3.318a1.404 1.404 0 110 2.807 1.404 1.404 0 010-2.807zm0 3.741c.342 0 .684.137.924.37.24.234.378.56.374.889v5.105c.004.33-.136.661-.38.895a1.341 1.341 0 01-1.848-.013 1.229 1.229 0 01-.368-.883V8.317a1.23 1.23 0 01.374-.889c.24-.233.58-.37.923-.37v.001z"
                                            ></path>
                                        </svg>
                                    </a>
                                </span>
                            </label>{" "}
                            <p class="text-sm text-center md:text-base md:font-medium">
                                Invite any number of members now (or later, too).{" "}
                                <span class="md:hidden">Additional rows appear as needed.</span>
                            </p>{" "}
                            <p class="hidden font-medium md:block">Additional rows appear as needed.</p>{" "}
                            <div class="flex flex-col items-center w-full pb-10 border-b border-tan-200 mt-7 md:w-1/2 mb-9">
                                <div>
                                    <button type="button">
                                        <span class="flex flex-col items-center mt-1 font-medium text-left text-red-600 focus:outline-none">
                                            <img src="/public/assets/img/other/invite_envelope.png" class="w-40" />{" "}
                                            <span>Preview invitation</span>
                                        </span>
                                    </button>
                                </div>
                            </div>{" "}
                            <div class="w-full md:w-1/2">
                                <div class="flex flex-col mb-5 ml-3 font-medium text-gray-500 md:items-center md:flex-row">
                                    <div class="flex items-center md:w-1/2">
                                        <div class="relative flex-shrink-0 text-center">
                                            <span
                                                class="
        absolute left-0 top-0 transform translate-y-1/2 bogus
        w-10 
        text-sm 
        font-bold text-white  
        uppercase"
                                            >
                                                TT
                                            </span>{" "}
                                        </div>{" "}
                                        <p class="pl-2 -mt-4 overflow-hidden truncate md:mt-0">Test Test</p>
                                    </div>{" "}
                                    <div class="flex md:w-1/2">
                                        <p class="ml-12 -mt-4 overflow-hidden text-sm truncate md:pl-4 md:ml-0 md:text-base md:mt-0">
                                            galowor737@cyclesat.com
                                        </p>
                                    </div>
                                </div>{" "}
                                <div class="flex flex-col w-full">
                                    <div class="flex flex-col px-2 pb-2 mb-5 rounded-md md:px-0 md:pb-0 md:flex-row last:mb-0 md:hover:bg-transparent hover:bg-tan-200">
                                        <div class="flex flex-col w-full md:w-1/2">
                                            <input
                                                id="id_nm_0"
                                                name="nm_0"
                                                placeholder="Full name"
                                                type="text"
                                                class="mr-1 font-medium md:mr-4 form-input"
                                            />
                                        </div>
                                        <div class="flex flex-col w-full md:pl-3 md:w-1/2">
                                            <input
                                                id="id_em_0"
                                                name="em_0"
                                                placeholder="Email address"
                                                type="email"
                                                class="font-medium form-input"
                                            />
                                        </div>
                                    </div>
                                    <div class="flex flex-col px-2 pb-2 mb-5 rounded-md md:px-0 md:pb-0 md:flex-row last:mb-0 md:hover:bg-transparent hover:bg-tan-200">
                                        <div class="flex flex-col w-full md:w-1/2">
                                            <input
                                                id="id_nm_1"
                                                name="nm_1"
                                                placeholder="Full name"
                                                type="text"
                                                class="mr-1 font-medium md:mr-4 form-input"
                                            />
                                        </div>
                                        <div class="flex flex-col w-full md:pl-3 md:w-1/2">
                                            <input
                                                id="id_em_1"
                                                name="em_1"
                                                placeholder="Email address"
                                                type="email"
                                                class="font-medium form-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>{" "}
                            <div class="flex mt-5 md:mt-10">
                                <button type="submit" class="btn btn-red-600 btn-snug">
                                    <span>save group &amp; invite</span>
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
                <div
                    id="nav"
                    class="
    order-1
    
      lg:hidden 
     
    
    
      lg:mt-24 
     
    "
                >
                    <aside
                        id="sidebar"
                        class="fixed inset-x-0 inset-y-0 z-50 flex flex-col items-center flex-shrink-0 w-screen h-full px-3 pb-40 mt-12 mb-10 mr-8 overflow-y-scroll duration-300 transform bg-tan-200 lg:z-30 pt-7 lg:mt-0 lg:pb-0 lg:px-0 lg:overflow-hidden lg:duration-0 lg:flex lg:transform-none lg:static lg:w-76 lg:pt-0 translate-y-full ease-in lg:static mt-40 lg:mt-0 lg:translate-y-0"
                    >
                        <button class="lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 16"
                                class="absolute top-0 right-0 h-4 mt-5 mr-4 text-tan-400"
                            >
                                <defs></defs>{" "}
                                <path
                                    fill="currentColor"
                                    d="M15.571 13.56L10.017 8l5.554-5.56a1.456 1.456 0 000-2.028 1.452 1.452 0 00-2.026 0l-5.554 5.56L2.437.412a1.452 1.452 0 00-2.026 0 1.456 1.456 0 000 2.028L5.965 8 .411 13.56a1.456 1.456 0 000 2.028c.549.55 1.478.55 2.026 0l5.554-5.56 5.554 5.56c.549.55 1.478.55 2.026 0 .572-.549.572-1.456 0-2.028z"
                                ></path>
                            </svg>
                        </button>{" "}
                        <div class="flex items-center justify-center mt-2 mb-7">
                            <span class="flex items-center justify-center w-10 h-10 mr-2 bg-yellow-200 rounded-md -ml-9">
                                <img
                                    width="28"
                                    height="28"
                                    src="/public/assets/img/icons/group-gradient.svg"
                                    class="h-7"
                                />
                            </span>{" "}
                            <h1 class="text-xl font-bold">Groups</h1>
                        </div>{" "}
                        <div class="flex flex-col w-full">
                            <div class="prompt v-cloak">
                                <div href="/preferences/mine/1141460/" class="flex flex-col items-center px-4 py-5">
                                    <h2 class="flex items-center justify-center w-full mb-1 text-lg font-bold">
                                        Invite family &amp; close friends
                                    </h2>{" "}
                                    <p>Start or join a group to share and shop each others lists.</p>{" "}
                                    <span class="flex mt-5">
                                        <a href="/group/new/" class="mr-3 btn btn-sm btn-red-600">
                                            <svg
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 17 17"
                                                class="w-4"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M.757 9.256a.755.755 0 110-1.511h6.987V.756a.755.755 0 111.511 0v6.987h6.988a.755.755 0 110 1.511H9.256v6.988a.755.755 0 11-1.511 0V9.256H.756z"
                                                ></path>
                                            </svg>{" "}
                                            <span>start group</span>
                                        </a>{" "}
                                        <a href="/search/" class="text-red-600 btn btn-sm btn-clear">
                                            <span>join group</span>
                                        </a>
                                    </span>
                                </div>
                            </div>{" "}
                            <div class="flex justify-center w-full mt-10">
                                <img src="/public/assets/img/other/family_circle.png" class="w-3/4" />
                            </div>
                        </div>
                    </aside>{" "}
                    <div
                        class="fixed top-0 left-0 z-40 w-full h-full transition duration-1000 ease-in-out transform bg-black opacity-50 lg:hidden hover:-translate-y-1 hover:scale-110"
                        style={{ display: "none" }}
                    ></div>{" "}
                    <nav class="fixed bottom-0 z-50 w-full lg:-ml-4 inset-x lg:hidden shadow-topLight">
                        <div class="flex h-16 bg-white justify-evenly top">
                            <a class="flex flex-col items-center justify-center flex-shrink-0 px-4 text-gray-500 focus:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 22" class="w-6">
                                    <defs></defs>
                                    <path
                                        fill="#D2D2D2"
                                        fill-rule="evenodd"
                                        d="M6.204 16.803l-1.029 3.676s12.058-.52 13.283-3.037c1.225-2.516 0-2.912 0-2.912L6.204 16.803z"
                                        clip-rule="evenodd"
                                    ></path>
                                    <path
                                        fill="#fff"
                                        fill-rule="evenodd"
                                        d="M2.863 3.949l2.14-2.642s10.315-2.31 10.315 2.642v10.977l3.14-.396S7.701 16.924 6.204 17.442c-1.2 3.314 0 3.314-4.14 2.767-1.326-3.846 0-14.707 0-14.707"
                                        clip-rule="evenodd"
                                    ></path>
                                    <path
                                        fill="#679090"
                                        fill-rule="evenodd"
                                        d="M19.569 14.495c-.196-.64-.525-.803-1.254-.64l-1.635.374-.416.096c0-.05 0-.098.015-.147l.005-.06c.024-.27.047-.529.055-.793l.024-.748c.045-1.322.09-2.688.11-4.033V8.51c.024-1.772.051-3.777-.432-5.722-.26-1.008-.783-2.219-2.551-2.49a6.887 6.887 0 00-1.216-.085c-.697.017-1.388.062-2.152.115-1.505.098-3.267.282-4.914.806-1.917.608-3.065 1.567-3.508 2.931a7.817 7.817 0 00-.341 1.705 153.16 153.16 0 00-.346 4.639C.89 12.389.804 14.016.74 15.538c-.006.448.015.895.065 1.34 0 .078.008.156.017.235.005.046.01.093.013.139.06.958.296 1.897.698 2.77a2.435 2.435 0 002.174 1.28 2.2 2.2 0 00.313-.021l.26-.035c.433-.06.864-.119 1.31-.155.334-.028.675-.047 1.005-.064l.04-.002c.486-.027.988-.055 1.471-.115a121.75 121.75 0 004.379-.614 16.034 16.034 0 004.965-1.597c1.628-.844 2.576-2.737 2.12-4.204zm-4.5-.213c.001.103-.009.205-.03.305a1.7 1.7 0 01-.355.09h-.03c-1.856.36-3.71.722-5.564 1.089l-2.204.435c-.05.01-.101.019-.152.027a9.468 9.468 0 00-.064.011 3.086 3.086 0 00-.495.105c-.628.213-.74.718-.83 1.13a5.448 5.448 0 01-1.152 2.35.966.966 0 01-.84.382.847.847 0 01-.647-.499 4.574 4.574 0 01-.512-1.54 30.708 30.708 0 01-.118-3.625c.054-2.178.174-4.547.332-7.218a17.8 17.8 0 01.384-2.784c.24-1.076 1.097-1.826 2.692-2.344 1.535-.52 3.206-.68 4.653-.79l.216-.016a21.14 21.14 0 011.56-.083h.074c.486.002.972.032 1.455.091.477.03.896.324 1.08.76.26.594.438 1.22.526 1.862.115 1.299.177 2.629.216 3.697l.016.31.038.756-.248 5.5zm-8.946 5.453l-.023.053-.016.038c-.02.043-.039.088-.055.133 1.947-.07 3.886-.28 5.803-.627a19.02 19.02 0 004.555-1.307c1.1-.477 1.764-1.202 2.027-2.212.048-.244.057-.494.026-.74v-.147l-1.08.245c-.818.19-1.666.386-2.508.556-2.353.474-4.748.94-7.055 1.39l-.773.15c-.17.034-.18.078-.192.142l-.052.299a5.76 5.76 0 01-.216.91 14.81 14.81 0 01-.441 1.117z"
                                        clip-rule="evenodd"
                                    ></path>
                                    <path
                                        fill="#929292"
                                        fill-rule="evenodd"
                                        d="M19.569 14.495c-.196-.64-.525-.803-1.254-.64l-1.635.374-.416.096c0-.05 0-.098.015-.147l.005-.06c.024-.27.047-.529.055-.793l.024-.748c.045-1.322.09-2.688.11-4.033V8.51c.024-1.772.051-3.777-.432-5.722-.26-1.008-.783-2.219-2.551-2.49a6.887 6.887 0 00-1.216-.085c-.697.017-1.388.062-2.152.115-1.505.098-3.267.282-4.914.806-1.917.608-3.065 1.567-3.508 2.931a7.817 7.817 0 00-.341 1.705 153.16 153.16 0 00-.346 4.639C.89 12.389.804 14.016.74 15.538c-.006.448.015.895.065 1.34 0 .078.008.156.017.235.005.046.01.093.013.139.06.958.296 1.897.698 2.77a2.435 2.435 0 002.174 1.28 2.2 2.2 0 00.313-.021l.26-.035c.433-.06.864-.119 1.31-.155.334-.028.675-.047 1.005-.064l.04-.002c.486-.027.988-.055 1.471-.115a121.75 121.75 0 004.379-.614 16.034 16.034 0 004.965-1.597c1.628-.844 2.576-2.737 2.12-4.204zm-4.5-.213c.001.103-.009.205-.03.305a1.7 1.7 0 01-.355.09h-.03c-1.856.36-3.71.722-5.564 1.089l-2.204.435c-.05.01-.101.019-.152.027a9.468 9.468 0 00-.064.011 3.086 3.086 0 00-.495.105c-.628.213-.74.718-.83 1.13a5.448 5.448 0 01-1.152 2.35.966.966 0 01-.84.382.847.847 0 01-.647-.499 4.574 4.574 0 01-.512-1.54 30.708 30.708 0 01-.118-3.625c.054-2.178.174-4.547.332-7.218a17.8 17.8 0 01.384-2.784c.24-1.076 1.097-1.826 2.692-2.344 1.535-.52 3.206-.68 4.653-.79l.216-.016a21.14 21.14 0 011.56-.083h.074c.486.002.972.032 1.455.091.477.03.896.324 1.08.76.26.594.438 1.22.526 1.862.115 1.299.177 2.629.216 3.697l.016.31.038.756-.248 5.5zm-8.946 5.453l-.023.053-.016.038c-.02.043-.039.088-.055.133 1.947-.07 3.886-.28 5.803-.627a19.02 19.02 0 004.555-1.307c1.1-.477 1.764-1.202 2.027-2.212.048-.244.057-.494.026-.74v-.147l-1.08.245c-.818.19-1.666.386-2.508.556-2.353.474-4.748.94-7.055 1.39l-.773.15c-.17.034-.18.078-.192.142l-.052.299a5.76 5.76 0 01-.216.91 14.81 14.81 0 01-.441 1.117z"
                                        clip-rule="evenodd"
                                    ></path>
                                    <path
                                        fill="#929292"
                                        d="M13.509 10.185a1.246 1.246 0 00-.419-.102 14.777 14.777 0 00-2.236 0c-.398.019-.808.038-1.203.038l-.574.017c-.53.015-1.19.032-1.833.085-1.056.086-2.133.226-3.083.35a.907.907 0 00-.406.192c-.039.028-.08.057-.12.081a.213.213 0 00-.109.194c.005.08.054.15.128.183l.138.066c.121.06.247.112.376.154.093.026.19.038.287.036H4.619l.863-.043 1.777-.093 2.2-.116c.302-.014.61-.042.909-.066.36-.031.732-.063 1.08-.076.129 0 .256-.013.384-.022.215-.018.431-.025.647-.02h.156c.221.015.443.015.665 0 .431-.048.516-.252.516-.417a.503.503 0 00-.307-.44zM4.515 5.272c.16.084.334.141.514.168h.024c.084.031.172.051.26.06h.085c.05.003.1.003.151 0 1.028-.086 2.06-.141 3.06-.196.85-.045 1.726-.094 2.607-.16a39.185 39.185 0 001.907-.19.847.847 0 00.367-.162c.036-.023.07-.047.108-.066a.213.213 0 00.04-.345c-.032-.028-.06-.06-.09-.09a.895.895 0 00-.335-.24c-.23-.076-.47-.11-.712-.101l-.864.02c-.9.014-1.833.033-2.746.108-1.122.094-2.25.264-3.342.426l-.337.051c-.199.045-.387.129-.552.248a2.143 2.143 0 01-.162.096.213.213 0 00-.11.191c.005.08.054.15.127.182zM13.872 7.292l-.119-.083a.986.986 0 00-.397-.213 3.911 3.911 0 00-.928-.045c-1.207.086-2.453.175-3.7.297-1.359.134-2.702.3-3.835.445a2.987 2.987 0 00-.596.164c-.08.03-.16.058-.24.083a.213.213 0 00-.15.229l.021.187c.012.1.093.178.194.188.076 0 .15.017.216.027.147.024.295.037.443.041h.11c2.22-.162 4.441-.329 6.662-.501l1.602-.124h.033a.452.452 0 00.215-.047c.117-.068.231-.14.346-.213l.123-.079a.213.213 0 000-.36v.004zM13.351 13.146c-.595-.245-1.295-.181-1.915-.128-.153.015-.302.028-.446.036-.687.04-1.591.096-2.507.173-1.36.113-2.707.258-3.843.386-.205.03-.406.083-.6.155-.08.028-.16.056-.242.08a.23.23 0 00-.153.238l.017.173c.01.1.09.18.19.192.076 0 .151.02.227.032.153.027.308.043.464.046h.082c1.546-.089 3.091-.18 4.635-.274l2.325-.143h.145c1.444-.064 1.81-.226 1.913-.448a.323.323 0 00-.05-.341.574.574 0 00-.242-.177z"
                                    ></path>
                                </svg>{" "}
                                <span class="flex-shrink-0 text-xs font-medium text-gray-500">My Lists</span>
                            </a>{" "}
                            <a class="flex flex-col items-center justify-center flex-shrink-0 px-4 text-gray-500 focus:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26" class="w-6">
                                    <g fill="none">
                                        <path
                                            fill="currentColor"
                                            d="M7.936 9.027s-3.009-1.789-3.152-1.88c-.143-.09-2.148-1.973-2.148-1.973l.048-1.193 1.624.184L8.08 6.643l1.098.595S8.031 5.128 8.031 4.94c0-.187-.427-2.197-.427-2.34A17.35 17.35 0 0 1 8.415.993l.858-.275 1.434 2.064s.428 1.745.571 2.02c.144.276.43 1.88.43 1.88l.86-1.927s1.1-1.921 1.194-2.155c.095-.234 1.29-1.56 1.624-1.607a3.09 3.09 0 0 1 1.004.094c.233.131.403.345.476.595 0 .185-.144 1.1-.144 1.1l-.19 1.654-.24.917S18.3 4.16 18.538 4.07c.238-.091 2.1-.322 2.197-.185.136.228.232.476.284.734 0 .137-.094.917-.094 1.055 0 .138-.63.879-.63.879l-4.671 2.982-9.36.549 1.672-1.056z"
                                            class="text-transparent"
                                        ></path>{" "}
                                        <path
                                            fill="currentColor"
                                            d="M1.418 10.14l20.63-.26.381 1.651v2.111l-.373 1.15-1.624-.232v8.247s-.86 1.742-1.529 1.836c-.668.093-13.87.353-14.34.26-.472-.094-1.79-1.56-1.79-1.56l.404-8.991-1.949-.08.19-4.132z"
                                            class="text-transparent"
                                        ></path>{" "}
                                        <path
                                            fill="currentColor"
                                            d="M6.454 9.032a3.513 3.513 0 0 1-.358-.22c-1.082-.861-2.21-1.69-3.247-2.6a2.911 2.911 0 0 1-.722-1.3c-.25-.78.27-1.412 1.123-1.4.38.011.757.092 1.106.237 1.283.538 2.52 1.16 3.542 2.111.086.071.176.137.271.195-.333-.959-.685-1.88-.963-2.823a2.481 2.481 0 0 1 .27-1.974c.71-1.253 1.894-1.346 2.78-.202.814 1.084 1.209 2.324 1.433 3.624.039.27.119.533.239.78.054-.156.113-.31.16-.465a8.3 8.3 0 0 1 1.744-3.315c.417-.48.93-.874 1.508-1.16a1.448 1.448 0 0 1 1.444.05c.435.272.677.753.628 1.25-.027.712-.322 1.417-.516 2.119a2.908 2.908 0 0 0-.198.663c.127-.086.27-.161.382-.26a5.14 5.14 0 0 1 2.465-1.102c.73-.12 1.412-.026 1.872.548.445.564.477 1.335.081 1.932a6.473 6.473 0 0 1-1.428 1.628 29.48 29.48 0 0 1-2.46 1.62c-.133.085-.27.166-.541.34.376.02.576.036.776.039 1.453.029 2.906.06 4.362.078.541 0 .774.244.744.751-.078 1.394-.14 2.788-.24 4.181a.574.574 0 0 1-.195.445.625.625 0 0 1-.477.153h-1.12c0 .73-.019 1.386 0 2.041.068 1.984.179 3.965.222 5.949.038 1.76-1.082 2.829-2.906 2.831-4.384.01-8.767.01-13.15 0-1.957 0-3.058-1.081-3.001-2.974.07-2.34.189-4.664.27-6.997 0-.07 0-.143-.024-.301H1.085c-.774 0-1.082-.297-1.082-1.025v-4.36c0-.704.308-.99 1.058-.99 1.588 0 3.176.013 4.767.02h.601l.025-.117zM1.802 13.78l20.308.598c-.1-1.238-.203-2.509-.309-3.799l-19.999.266v2.935zm10.44 10.332c.162 0 .367.026.573.026 1.779.01 3.557.018 5.336.021 1.14 0 1.486-.35 1.518-1.44.06-2.054.146-4.108.23-6.165.019-.483.07-.97.114-1.534l-7.43.26-.342 8.832zm-8.82-8.606c0 1.137-.018 2.216 0 3.295.03 1.36.077 2.72.155 4.074.057.951.455 1.3 1.405 1.284l5.509-.023c.184 0 .368-.021.54-.029a.736.736 0 0 0 .063-.161c-.1-2.733-.21-5.46-.292-8.195-.014-.455-.27-.447-.59-.44-1.93.045-3.861.076-5.79.123-.363.007-.726.052-1 .072zm10.824-6.24c.164-.03.324-.073.48-.13.67-.267 1.321-.575 1.95-.923a47.567 47.567 0 0 0 3.231-2.168 2.43 2.43 0 0 0 .698-.983c.22-.502-.062-.912-.606-.816-.657.12-1.38.28-1.894.652C16.528 6.032 15.37 7.553 14.25 9.1c-.016.016 0 .06 0 .169l-.003-.003zm-1.623-.09c.14-.128.195-.157.22-.2 1.033-1.82 2.077-3.64 3.087-5.46.217-.41.367-.848.446-1.3a.955.955 0 0 0-.238-.726c-.079-.086-.48 0-.652.12a3.982 3.982 0 0 0-.912.824c-1.526 1.965-2.024 4.225-1.962 6.744l.01-.003zm-1.353-.33a3.77 3.77 0 0 0 0-.52c-.244-1.35-.384-2.728-.717-4.062a11.43 11.43 0 0 0-1.137-2.618c-.316-.577-.711-.52-1.052.065-.341.585-.27 1.172-.087 1.765.59 1.82 1.58 3.458 2.66 5.047.097.112.2.218.311.317l.022.005zM3.158 4.442c.178 1.67 4.01 4.26 6.478 4.42C7.73 6.99 5.912 5.171 3.158 4.443z"
                                        ></path>
                                    </g>
                                </svg>{" "}
                                <span class="flex-shrink-0 text-xs font-medium text-gray-500">Shop For</span>
                            </a>{" "}
                            <a class="flex flex-col items-center justify-center flex-shrink-0 px-4 text-gray-500 focus:shadow-none">
                                <div class="relative w-6 h-6 mb-5 -mt-5 -ml-4">
                                    <svg
                                        width="94"
                                        height="26"
                                        viewBox="0 0 94 26"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="absolute"
                                        style={{ marginTop: "-17px", marginLeft: "-35px" }}
                                    >
                                        <g filter="url(#filter1_d)">
                                            <path
                                                d="M18.2272 26C-24.7728 26 32.9772 26 18.2272 26C30.2272 26 28.727 4 54.227 4C79.727 4 80.2269 26 91.2269 26H18.2272Z"
                                                fill="white"
                                            ></path>
                                        </g>{" "}
                                        <defs>
                                            <filter
                                                id="filter1_d"
                                                x="0"
                                                y="0"
                                                width="93.2269"
                                                height="26"
                                                filterUnits="userSpaceOnUse"
                                                color-interpolation-filters="sRGB"
                                            >
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
                                                <feColorMatrix
                                                    in="SourceAlpha"
                                                    type="matrix"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                ></feColorMatrix>{" "}
                                                <feOffset dy="-2"></feOffset>{" "}
                                                <feGaussianBlur stdDeviation="1"></feGaussianBlur>{" "}
                                                <feColorMatrix
                                                    type="matrix"
                                                    values="0 0 0 0 0.2875 0 0 0 0 0.280073 0 0 0 0 0.250365 0 0 0 0.17 0"
                                                ></feColorMatrix>{" "}
                                                <feBlend
                                                    mode="normal"
                                                    in2="BackgroundImageFix"
                                                    result="effect1_dropShadow"
                                                ></feBlend>{" "}
                                                <feBlend
                                                    mode="normal"
                                                    in="SourceGraphic"
                                                    in2="effect1_dropShadow"
                                                    result="shape"
                                                ></feBlend>
                                            </filter>
                                        </defs>
                                    </svg>{" "}
                                    <svg
                                        width="9"
                                        height="4"
                                        viewBox="0 0 9 4"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="absolute z-20 ml-4 -mt-2 text-gray-200"
                                    >
                                        <path
                                            d="M0.503861 2.13176C0.0243436 2.40577 -0.142253 3.01662 0.131757 3.49614C0.405767 3.97566 1.01662 4.14225 1.49614 3.86824L0.503861 2.13176ZM4.5 1L4.99614 0.131757C4.68871 -0.043919 4.31129 -0.043919 4.00386 0.131757L4.5 1ZM7.50386 3.86824C7.98338 4.14225 8.59423 3.97566 8.86824 3.49614C9.14225 3.01662 8.97566 2.40577 8.49614 2.13176L7.50386 3.86824ZM1.49614 3.86824L4.99614 1.86824L4.00386 0.131757L0.503861 2.13176L1.49614 3.86824ZM4.00386 1.86824L7.50386 3.86824L8.49614 2.13176L4.99614 0.131757L4.00386 1.86824Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 39 40"
                                        class="absolute top-0 w-10"
                                    >
                                        <defs></defs>{" "}
                                        <g filter="url(#filter0_d)">
                                            <circle
                                                cx="19.2623"
                                                cy="19"
                                                r="19"
                                                fill="currentColor"
                                                class="text-yellow-400"
                                            ></circle>
                                        </g>{" "}
                                        <defs>
                                            <filter
                                                id="filter0_d"
                                                width="38"
                                                height="40"
                                                x="0.262329"
                                                y="0"
                                                color-interpolation-filters="sRGB"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
                                                <feColorMatrix
                                                    in="SourceAlpha"
                                                    type="matrix"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                ></feColorMatrix>{" "}
                                                <feOffset dy="2"></feOffset>{" "}
                                                <feColorMatrix
                                                    type="matrix"
                                                    values="0 0 0 0 0.890196 0 0 0 0 0.772549 0 0 0 0 0.219608 0 0 0 1 0"
                                                ></feColorMatrix>{" "}
                                                <feBlend
                                                    in2="BackgroundImageFix"
                                                    mode="normal"
                                                    result="effect1_dropShadow"
                                                ></feBlend>{" "}
                                                <feBlend
                                                    in="SourceGraphic"
                                                    in2="effect1_dropShadow"
                                                    mode="normal"
                                                    result="shape"
                                                ></feBlend>
                                            </filter>
                                        </defs>
                                    </svg>{" "}
                                    <img
                                        width="28"
                                        height="28"
                                        src="/public/assets/img/icons/group-gradient.svg"
                                        class="absolute top-0 w-6 mt-2 text-red-600 lg:hidden"
                                        style={{ marginLeft: "9px" }}
                                    />
                                </div>{" "}
                                <span class="z-10 flex-shrink-0 text-xs font-medium text-red-600">Groups</span>
                            </a>{" "}
                            <div class="flex md:hidden">
                                <div
                                    class="
        min-w-0 my-3 mr-1 border-gray-200 
        border-r 
        "
                                ></div>{" "}
                                <button
                                    id="beacon-mobile"
                                    class="flex flex-col items-center justify-center flex-shrink-0 px-4 text-gray-500 focus:shadow-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 22" class="w-6">
                                        <path
                                            fill="currentColor"
                                            fill-rule="evenodd"
                                            d="M14.167 15.165c-.622.138-1.258.13-1.876.124-.143-.001-.286-.004-.429-.004a.544.544 0 00-.421.197c-.67.736-1.34 1.468-2.01 2.199-.55.6-1.099 1.2-1.644 1.799l-.475.51v-4.7h-.433a5.911 5.911 0 01-3.713-1.406 6.061 6.061 0 01-2.015-3.462 6.927 6.927 0 01-.11-1.321c-.025-.785.005-1.59.09-2.383a6.01 6.01 0 011.557-3.229 5.852 5.852 0 013.09-1.744c.435-.09.88-.137 1.321-.139h5.92c1.356 0 2.682.48 3.733 1.35a6.036 6.036 0 012.05 3.443c.151.76.14 1.527.131 2.27-.002.184-.004.369-.004.553A6.09 6.09 0 0117.6 13.06a5.93 5.93 0 01-3.433 2.104zm5.632-4.976c.076-.989.095-1.999.055-2.997a5.817 5.817 0 00-.533-2.325c-1.24-2.738-3.38-4.161-6.365-4.233C11.813.601 10.65.613 9.524.624L8.87.631c-.229.001-.46 0-.688-.002-.16-.002-.322-.003-.484-.003-.529 0-1.062.015-1.574.095-2.909.45-4.842 2.13-5.747 4.994-.426 1.322-.49 2.84-.197 4.637.443 2.716 2.013 4.584 4.667 5.552.295.103.602.173.926.247.156.036.314.071.472.112l.106.026.022.325c0 .335-.002.66-.003.984-.005.646-.009 1.291.003 1.939 0 .223.05.443.146.642a1.086 1.086 0 001.787.173c1.02-1.095 2.083-2.26 3.35-3.671.225-.286.586-.446.952-.416a6.778 6.778 0 004.931-1.771c1.328-1.198 2.088-2.646 2.26-4.305z"
                                            clip-rule="evenodd"
                                            class="text-gray-500"
                                        ></path>{" "}
                                        <path
                                            fill="currentColor"
                                            fill-rule="evenodd"
                                            d="M9.8 10.21c.197.061.417.007.606-.148v-.001c.46-.373.925-.737 1.39-1.102l.483-.38c.726-.563 1.071-1.187 1.085-1.965l-.007-.092c-.005-.077-.01-.16-.023-.241a2.719 2.719 0 00-.806-1.481 2.982 2.982 0 00-1.984-.952c-.706-.036-1.393.213-2.143.79a.552.552 0 00-.154.742.562.562 0 00.341.29c.143.042.3.021.429-.056a4.54 4.54 0 01.391-.222l.034-.016c.06-.028.119-.06.179-.091.216-.113.44-.23.683-.256.586-.059 1.11.21 1.56.801.486.64.407 1.249-.23 1.762-.34.268-.692.527-1.045.787l-.178.132-.191.144c-.283.21-.55.41-.722.7a.517.517 0 00-.1.413v.004c.067.22.213.38.401.438zM9.02 12.768a.72.72 0 00.667.451h.001a.73.73 0 00.721-.73.73.73 0 00-.724-.736.714.714 0 00-.509.214.741.741 0 00-.156.8z"
                                            clip-rule="evenodd"
                                            class="text-gray-500"
                                        ></path>
                                    </svg>{" "}
                                    <span class="flex-shrink-0 text-xs font-medium text-gray-500">Help</span>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
                <script type="text/javascript" src="/public/build/vue/js/nav.5d14708e.js"></script>
            </div>
        </>
    );
};

export default AddGroup;
