import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import React from "react";
import Loader from "../components/Loader";
export const Login = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const TryLogin = async () => {
    setShowLoader(true);
    try {
      const { status, data } = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log(status, data);
      if (status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("token", data.authToken);
        window.location.href = "/sale";
      }
    } catch (error) {
      toast.error(
        (error as any).response.data.message || (error as any).message
      );
    } finally {
      setShowLoader(false);
      handleReset(null);
    }
  };
  const { values, handleChange, handleSubmit, handleBlur, handleReset } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        TryLogin();
      },
    });
  return (
    <div className="bg-[#070709] relative h-screen m-0 p-0 rounded-none">
      {showLoader && <Loader />}
      <section className="z-10">
        <div className="flex  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <img
              src="/assets/randomz.png"
              alt="logo"
              width={120}
              className="my-2"
            />
          </a>
          <div className="w-full md:bg-[#0A0D19] bg-[#111526]  z-10 my-4 rounded-lg  md:mt-0 sm:max-w-2xl lg:max-w-3xl xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-xl">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    id="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#C0317C]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-white text-center">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/signup"}
                    className="font-medium text-[#C0317C] hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div
        className="absolute inset-0 md:translate-x-full rotate-180"
        style={{
          content: "",
          position: "absolute",
          zIndex: "0",
          top: 0,
          right: 0,
          width: "50%",
          height: "80%",
          borderRadius: "900px",
          background:
            "linear-gradient(180deg, rgba(167, 36, 104, 0.80) 0%, rgba(14, 37, 157, 0.80) 100%)",
          filter: "blur(250px)",
        }}
      ></div>
    </div>
  );
};
