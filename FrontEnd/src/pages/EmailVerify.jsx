import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Button from "../components/common/Button";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { handleInput, handleKeyDown } from "../services/auth-services.js";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  axios.defaults.withCredentials = true;
  const { backEndUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        `${backEndUrl}/api/auth/verify-account`,
        { otp }
      );
      if (data.success) {
        toast.success(data.message, {
          autoClose: 2000,
          theme: "colored",
        });
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.response.data.errors, {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary to-primary">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-5 top-5 w-28 cursor-pointer sm:left-20 sm:w-32"
      />
      <form
        action=""
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className=" w-12 h-12 bg-tertiary text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index, inputRefs)}
                onKeyDown={(e) => handleKeyDown(e, index, inputRefs)}
              />
            ))}
        </div>
        <Button
          className="rounded-full cursor-pointer hover:opacity-80 transition-all duration-200 ease-in-out w-full py-2.5 bg-gradient-to-r from-secondary to-indigo-900 text-white font-medium"
          text="Verify Email"
        />
      </form>
    </div>
  );
};

export default EmailVerify;
