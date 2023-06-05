import React from "react";
import GroupImg from "../../../assets/group2.svg";
import { useNavigate } from "react-router-dom";

const GroupLanding = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="flex flex-col ">
                <div className="flex flex-col items-center justify-center py-5 bg-yellow-600 md:py-10 md:flex-row bg-pattern-presents-yellow-light md:px-5 xl:px-0 md:pt-[100px] md:mb-[-100px] z-10">
                    <div className="z-10 flex justify-center w-56 md:mr-10 md:block md:w-90">
                        <img src={GroupImg} className="w-[200px] h-[200px] md:w-[250px] md:h-[250px]" alt="Group" />
                    </div>{" "}
                    <div className="px-5 pt-32 pb-5 mx-5 -mt-32 bg-white rounded-md md:w-112 md:bg-transparent md:mx-0 md:px-0 md:pt-0 md:-mt-0 md:pb-0">
                        <h1 className="text-2xl text-center md:text-3xl font-headline md:text-left">
                            Bring your family together with a group
                        </h1>{" "}
                        <p className="pt-5 text-center pb-7 md:text-left">
                            Share and shop each other’s lists to avoid duplicate gifts and <br /> connect with family
                            anytime.
                            <span className="font-bold">Who will you invite?</span>
                        </p>{" "}
                        <span className="flex justify-center md:justify-start">
                            <a
                                href=""
                                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 hover:bg-white hover:text-black"
                                onClick={() => {
                                    navigate("/groups/new");
                                }}
                            >
                                Start a group
                                <svg
                                    className="w-5 h-5 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#ca8a04"
                        fill-opacity="1"
                        d="M0,96L60,117.3C120,139,240,181,360,176C480,171,600,117,720,106.7C840,96,960,128,1080,128C1200,128,1320,96,1380,80L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    ></path>
                </svg>
            </section>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-4xl text-black text-center mt-12 pr-5 pl-5 md:mt-[-150px]">
                Top tips when you’re new to groups
            </h1>

            <div className="w-full px-8 mx-auto mt-20 space-y-2 shadow lg:max-w-md mb-12 md:mb-[100px]">
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">What does a Wishy group do for me?</summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            A group gives you one private, central place to view and shop everyone’s lists, anytime.
                            Your family is a group. Your close friends are a group. A group defines whose lists you can
                            share and shop when signed into Wishy.
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">Should I start or join a group?</summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            If you start the group, you get to name it and decide who’s in or out. You’ll get your own
                            Wishy group manager page. To join an existing group, search for a group member by name using
                            Member Search and tap the Request Membership link. Or, ask the group creator to invite you.
                            Either way you’ll see the list sharing in Wishy come to life.
                        </p>
                    </div>
                </details>
            </div>
        </>
    );
};

export default GroupLanding;
