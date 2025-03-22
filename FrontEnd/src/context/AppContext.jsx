import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/user/profile`);
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };
  const value = {
    backEndUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
