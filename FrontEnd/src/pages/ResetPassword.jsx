import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useRef, useState } from "react";
import Button from "../components/common/Button";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { handleInput, handleKeyDown } from "../services/auth-services";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState();
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const inputRefs = useRef([]);
  const { backEndUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${backEndUrl}/api/auth/send-reset-otp`,
        { email }
      );
      data.success
        ? toast.success(data.message, {
            autoClose: 2000,
            theme: "colored",
          })
        : toast.error(data.message, {
            autoClose: 2000,
            theme: "colored",
          });
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.response.data.errors, {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const onSubmitOtp = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(""));
      setIsOtpSubmited(true);
    } catch (error) {
      toast.error(error.response.data.errors, {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const onSubmitNewPassword = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${backEndUrl}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      data.success
        ? toast.success(data.message, {
            autoClose: 2000,
            theme: "colored",
          })
        : toast.error(data.message, {
            autoClose: 2000,
            theme: "colored",
          });
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.response.data.errors, {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-secondary to-primary">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-5 top-5 w-28 cursor-pointer sm:left-20 sm:w-32"
      />
      {/* enter email id */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-10 rounded-lg shadow-lg w-full text-indigo-300 text-sm sm:w-96"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div className="flex items-center gap-3 w-full rounded-full bg-tertiary px-5 py-2.5 ">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="example@gmail.com"
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
          <Button
            text="Submit"
            className="rounded-full cursor-pointer mt-5 hover:opacity-80 transition-all duration-200 ease-in-out w-full py-2.5 bg-gradient-to-r from-secondary to-indigo-900 text-white font-medium"
          />
        </form>
      )}

      {/* otp form input */}
      {!isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          action=""
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password OTP
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
            text="Submit"
          />
        </form>
      )}

      {/* enter new password */}
      {isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-10 rounded-lg shadow-lg w-full text-indigo-300 text-sm sm:w-96"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your new password below
          </p>
          <div className="flex items-center  gap-3 w-full rounded-full bg-tertiary px-5 py-2.5 ">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              placeholder="Enter your new password"
              required
              className="bg-transparent outline-none text-white w-full "
            />
          </div>
          <Button
            text="Submit"
            className="rounded-full cursor-pointer mt-5 hover:opacity-80 transition-all duration-200 ease-in-out w-full py-2.5 bg-gradient-to-r from-secondary to-indigo-900 text-white font-medium"
          />
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
