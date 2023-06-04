import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faEyeSlash,
  faEye,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const register_state = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const regexValid__state = {
  username: /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

const validCamps__state = {
  username: false,
  password: false,
  email: false,
  confirmPassword: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationform, setRegistrationForm] = useState(register_state);
  const [regexValid] = useState(regexValid__state);
  const [validate, setValidate] = useState(validCamps__state);
  const MySwal = withReactContent(Swal);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Validating fields with regex
  useEffect(() => {
    const result = regexValid.username.test(registrationform.username);
    setValidate({
      ...validate,
      username: result,
    });
  }, [registrationform.username]);

  useEffect(() => {
    const result = regexValid.email.test(registrationform.email);
    setValidate({
      ...validate,
      email: result,
    });
  }, [registrationform.email]);

  useEffect(() => {
    const result = regexValid.password.test(registrationform.password);
    const match =
      registrationform.password === registrationform.confirmPassword;
    setValidate({
      ...validate,
      password: result,
      confirmPassword: match,
    });
  }, [registrationform.password]);

  useEffect(() => {
    const match =
      registrationform.password === registrationform.confirmPassword;
    setValidate({
      ...validate,
      confirmPassword: match,
    });
  }, [registrationform.confirmPassword]);

  // Populate registration form
  const handleChange = (e) => {
    setRegistrationForm({
      ...registrationform,
      [e.target.name]: e.target.value,
    });
  };

  // Change visibility of password & password confirmation
  const switchPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // If every fields validation is true, continue with the registration process
    if (Object.values(validate).every((item) => item === true)) {
      try {
        const response = await axios.post("/auth/register", registrationform);
        if (response.status === 200) {
          // If registration is successful, show a message and redirect to home page
          MySwal.fire({
            title: <strong>Account registered successfuly!</strong>,
            html: <i>Great to have you on our community!</i>,
            icon: "success",
          }).then(() => {
            navigate("/home");
          });
        }
      } catch (err) {
        MySwal.fire({
          title: <strong>Registration failed!</strong>,
          html: <i>{err.response.data}</i>,
          icon: "error",
        })
      }
    }
    // Check every field and if its validation is false, output a message
    else {
      for (const key in validate) {
        if (validate[key] === false) {
          MySwal.fire({
            title: <strong>Your {key} is not valid!</strong>,
            html: <i></i>,
            icon: "error",
          }).then(() => {
            // usernameRef.current.focus();
            return;
          });
        }
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>

      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-11/12 max-w-[700px] px-10 py-10 rounded-3xl bg-white border-2 border-gray-100 ">
          <h1 className="text-4xl font-semibold">Welcome to Wishy</h1>
          <p className="font-medium text-md text-gray-500 mt-4">
            Welcome! Please enter you details.
          </p>

          <div className="mt-8">
            {/* Username */}
            <div className="flex flex-col">
              <label className="text-lg font-medium">
                Username
                <span
                  className={
                    validate.username ? "text-emerald-500 ml-2" : "collapse"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validate.username || !registrationform.username
                      ? "collapse"
                      : "text-red-500 ml-2"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                value={registrationform.username}
                name="username"
                autoComplete="off"
                ref={usernameRef}
                onChange={handleChange}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            {/* Email */}
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">
                Email
                <span
                  className={
                    validate.email ? "text-emerald-500 ml-2" : "collapse"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validate.email || !registrationform.email
                      ? "collapse"
                      : "text-red-500 ml-2"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                value={registrationform.email}
                name="email"
                autoComplete="off"
                ref={emailRef}
                onChange={handleChange}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Password */}
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium inline-block">
                Password
                <FontAwesomeIcon
                  className="ml-4"
                  onClick={switchPasswordVisibility}
                  style={{ cursor: "pointer" }}
                  icon={showPassword ? faEye : faEyeSlash}
                />
                <span
                  className={
                    validate.password ? "text-emerald-500 ml-2" : "collapse"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validate.password || !registrationform.password
                      ? "collapse"
                      : "text-red-500 ml-2"
                  }
                >
                  <FontAwesomeIcon
                    data-tooltip-target="tooltip-password"
                    icon={faTimes}
                  />
                  <div
                    id="tooltip-password"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                  >
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </span>
              </label>

              <input
                value={registrationform.password}
                name="password"
                ref={passwordRef}
                autoComplete="off"
                onChange={handleChange}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
              />
            </div>
            {/* Confirm password */}
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium inline-block">
                Confirm Password
                <span
                  className={
                    validate.confirmPassword &&
                    registrationform.confirmPassword !== ""
                      ? "text-emerald-500 ml-2"
                      : "collapse"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validate.confirmPassword ||
                    !registrationform.confirmPassword
                      ? "collapse"
                      : "text-red-500 ml-2"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                value={registrationform.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
                ref={confirmPasswordRef}
                name="confirmPassword"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Confirm your password"
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              {/* Handle Register */}
              <button
                onClick={handleRegister}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                Sign up
              </button>
              {/* Google Button */}
              <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                    fill="#34A853"
                  />
                  <path
                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                    fill="#FBBC05"
                  />
                </svg>
                Sign up with Google
              </button>
            </div>
            {/* Already have an account */}
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Already have an account?</p>
              <button
                onClick={() => navigate("/login")}
                className="ml-2 font-medium text-base text-violet-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
