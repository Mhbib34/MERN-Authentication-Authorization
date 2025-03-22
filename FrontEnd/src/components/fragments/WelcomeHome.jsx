import { useContext } from "react";
import { assets } from "../../assets/assets";
import Button from "../common/Button";
import { AppContext } from "../../context/AppContext";

const WelcomeHome = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className=" flex flex-col mt-36 justify-center items-center gap-3 font-sans">
      <img src={assets.header_img} alt="" className="w-36 h-36 " />
      <span className="font-medium text-xl flex items-center justify-center gap-2">
        Hallo {userData ? userData.name : "Developer"}{" "}
        <img src={assets.hand_wave} className="w-6 h-6" />{" "}
      </span>
      <span className="font-bold text-3xl">Welcome to our app</span>
      <p className="max-w-md text-center">
        Let's start with a quick product tour and we will have you up and
        running in no time
      </p>
      <Button
        text="Get Started"
        className="py-2 px-4 border-2 rounded-full font-medium hover:bg-secondary transition-all duration-200 ease-in-out cursor-pointer hover:border-secondary hover:text-white"
      />
    </div>
  );
};

export default WelcomeHome;
