import { createContext } from "react";

export default createContext({
  setUserData: () => {},
  userData: {
    token: "",
    user: {},
  },
});
