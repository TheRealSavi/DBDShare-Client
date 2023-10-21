import { PropsWithChildren, createContext, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../types/types";
import { apiUrl } from "../apiConfig";

interface IUserContext {
  userDetails: IUser | undefined;
  reloadUser: () => void;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = (props: PropsWithChildren) => {
  const [userObj, setUserObj] = useState<IUser>();

  const getUser = async () => {
    try {
      const response = await axios.get(apiUrl + "getuser", {
        withCredentials: true,
      });
      setUserObj(response.data);
      console.log("Api Getuser call");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails: userObj, reloadUser: getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
