import React from "react";
import imgu from "../../assets/wishlist.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="pt-12 pb-12 bg-white dark:bg-blue-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Create your first list
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              <b>Add any item.</b> Easily share it with others or keep it
              private.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 hover:bg-white hover:text-black"
              onClick={() => {navigate('/add_new')}}
            >
              Get started
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
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={imgu} alt="mockup" />
          </div>
        </div>
      </section>

      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-4xl text-black text-center mt-12 pr-5 pl-5">
        Top tips for first time list makers
      </h1>

      <div className="w-full px-8 mx-auto mt-20 space-y-2 shadow lg:max-w-md mb-12">
        <details className="p-4 rounded-lg">
          <summary className="font-semibold">
            Can I really add any item I want?
          </summary>
          <div className="mt-3">
            <p className="text-sm leading-6 text-gray-600">
              Yes. Just type in an item name and it's details.
            </p>
          </div>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="font-semibold">
            Do people have to join Wishy to shop my list?
          </summary>
          <div className="mt-3">
            <p className="text-sm leading-6 text-gray-600">
              No, others can shop your list without an account. Set your list to
              public privacy and share the link. Optionally, if you create a
              group and invite others, list sharing is automatic without having
              to send list links.
            </p>
          </div>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="font-semibold">
            Will I know if someone buys something on my list?
          </summary>
          <div className="mt-3">
            <p className="text-sm leading-6 text-gray-600">
              Wishy hides the status of items on your own list, to keep the
              surprise.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Home;
