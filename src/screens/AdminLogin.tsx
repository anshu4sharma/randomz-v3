import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import React from "react";
import Loader from "../components/Loader";
import OTPInput from "react-otp-input";
export const AdminLogin = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const TryLogin = async () => {
    if (!values.otp || !values.email) {
      return toast.error("Please Fill all the fields ");
    }
    setShowLoader(true);
    try {
      const { status, data } = await axios.post(
        `${process.env.VITE_SERVER_URL}/admin/login`,
        {
          email: values.email,
          otp: values.otp,
        }
      );
      console.log(status, data);
      if (status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("token", data.authToken);
        window.location.href = "/admin/allusers";
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
        otp: "",
      },
      onSubmit: (values) => {
        console.log(values);
        TryLogin();
      },
    });
  const sendEmail = async () => {
    setShowLoader(true);
    try {
      const { status, data } = await axios.post(
        `${process.env.VITE_SERVER_URL}/admin/login-otp`,
        {
          email: values.email,
        }
      );
      console.log(status, data);
      if (status === 200) {
        return toast.success("Email Sent");
      }
    } catch (error) {
      toast.error(
        (error as any).response.data.message || (error as any).message
      );
    } finally {
      setShowLoader(false);
    }
  };
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
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="flex gap-4 w-full items-start justify-center flex-col">
                  <div className="flex flex-col w-full ">
                    <div className="flex justify-between w-full flex-col md:flex-row">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        E-Mail
                      </label>
                      <div className="text-white flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M11 7H9V5H11M11 15H9V9H11M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                            fill="#EE3C99"
                          />
                        </svg>{" "}
                        <p className="text-sm my-2">
                          OTP Will be sent to your email
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col md:flex-row">
                      <input
                        type="email"
                        name="email"
                        required
                        id="email"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="name@company.com"
                      />{" "}
                      <button
                        disabled={!values.email}
                        type="button"
                        onClick={sendEmail}
                        className="text-white disabled:cursor-not-allowed max-w-[160px] h-full  bg-[#C0317C] hover:bg-[#d35898] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 w-full"
                      >
                        Verify email
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Enter Otp
                  </label>
                  <OTPInput
                    value={values.otp}
                    onChange={(otp) => {
                      console.log(otp);
                      handleChange({
                        target: { name: "otp", value: otp },
                      });
                    }}
                    inputStyle={{
                      width: "2.5rem",
                      height: "2.5rem",
                      fontSize: "1.5rem",
                      color: "#000",
                      borderRadius: 4,
                      display: "grid",
                      gridTemplateColumns: "repeat(4,1fr)",
                    }}
                    placeholder="----"
                    numInputs={4}
                    renderSeparator={<span className="m-3">-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#C0317C]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
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
