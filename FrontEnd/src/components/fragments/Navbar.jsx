import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backEndUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backEndUrl}/api/auth/logout`);
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex px-32 py-4 justify-between">
      <img src={assets.logo} alt="" />

      {userData ? (
        <div className="w-8 h-8 flex justify-center cursor-pointer items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className=" absolute hidden group-hover:block  top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li className=" py-1 px-2 hover:bg-gray-200 cursor-pointer font-medium">
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className=" py-1 px-2 hover:bg-gray-200 cursor-pointer font-medium pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate("/login")}
          className="flex border-2 cursor-pointer py-2 px-6 rounded-2xl items-center justify-center gap-2 hover:bg-primary hover:border-primary transition-all duration-200 ease-in-out"
        >
          <span className="font-medium">Login</span>
          <img src={assets.arrow_icon} className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
