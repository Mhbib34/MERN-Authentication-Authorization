import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backEndUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backEndUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
          getUserData();
          toast.success(data.message, {
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backEndUrl}/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
          getUserData();
          toast.success(data.message, {
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          toast.error(data.message);
        }
      }
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
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full text-indigo-300 text-sm sm:w-96">
        <h2 className="text-3xl text-center text-white font-semibold mb-3">
          {state === "Sign Up" ? "Register" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your Account"
            : "Login to your account!"}
        </p>
        <form
          action=""
          className="flex flex-col gap-2"
          onSubmit={onSubmitHandler}
        >
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full rounded-full bg-tertiary px-5 py-2.5 ">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          )}
          <div className="flex items-center gap-3 w-full rounded-full bg-tertiary px-5 py-2.5 ">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder={
                state === "Sign Up" ? "Email id" : "example@gmail.com"
              }
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
          <div className="flex items-center gap-3 w-full rounded-full bg-tertiary px-5 py-2.5 ">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder={
                state === "Sign Up" ? "Your password" : "***************"
              }
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-indigo-500 cursor-pointer mb-4"
            >
              Forgot password?
            </p>
          )}

          <Button
            className={`${
              state === "Sign Up" ? "mt-4" : "mt-0"
            } rounded-full cursor-pointer hover:opacity-80 transition-all duration-200 ease-in-out w-full py-2.5 bg-gradient-to-r from-secondary to-indigo-900 text-white font-medium`}
            text={state}
          />
        </form>
        {state === "Sign Up" ? (
          <p className="text-center mt-2 text-xs text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center mt-2 text-xs text-gray-400">
            Dont have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
