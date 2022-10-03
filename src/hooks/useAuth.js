import { useContext } from "react";
import { AuthContext } from "../context.js/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
