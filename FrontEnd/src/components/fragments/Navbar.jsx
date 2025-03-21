import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex px-32 py-4 justify-between">
      <img src={assets.logo} alt="" />
      <div
        onClick={() => navigate("/login")}
        className="flex border-2 cursor-pointer py-2 px-6 rounded-2xl items-center justify-center gap-2 hover:bg-primary hover:border-primary transition-all duration-200 ease-in-out"
      >
        <span className="font-medium">Login</span>
        <img src={assets.arrow_icon} className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Navbar;
