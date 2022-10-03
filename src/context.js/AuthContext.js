import { createContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apisevice from "../app/apisevice";
import isValidToken from "../utills/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext({ ...initialState });

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const INITIALIZE = "INITIALIZE";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const UPDATEPROFILE = "UPDATEPROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { data, isAuthenticated } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user: data,
      };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case UPDATEPROFILE:
      const {
        name,
        avatarUrl,
        coverUrl,
        aboutMe,
        city,
        country,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          name,
          avatarUrl,
          coverUrl,
          aboutMe,
          city,
          country,
          facebookLink,
          instagramLink,
          linkedinLink,
          twitterLink,
        },
      };
    default:
      return state;
  }
};

const setSession = async (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apisevice.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken", accessToken);
    delete apisevice.defaults.headers.common.Authorization;
  }
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateUser } = useSelector((state) => state.users);
  useEffect(() => {
    const isInitialized = async () => {
      const accessToken = window.localStorage.getItem("accessToken");
      try {
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apisevice.get("/users/me");
          const { data } = response.data;
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, data },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, data: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, data: null },
        });
      }
    };
    isInitialized();
  }, []);

  useEffect(() => {
    if (updateUser) {
      dispatch({ type: UPDATEPROFILE, payload: updateUser });
    }
  }, [updateUser]);

  const login = async ({ email, password }, callback) => {
    const response = await apisevice.post("/auth/login", { email, password });
    const { user, accessToken } = response.data.data;
    setSession(accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    callback();
    toast.success("login success");
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT_SUCCESS });
    callback();
  };

  const register = async ({ name, email, password, city, phone }, callback) => {
    const response = await apisevice.post("/users", {
      name,
      email,
      password,
      city,
      phone,
    });
    const { user, accessToken } = response.data.data;
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
    toast.success("register success");
  };
  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
