import { PropsWithChildren, createContext, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../types/types";

const UserContext = createContext({});

const UserProvider = (props: PropsWithChildren) => {
  const [userObj, setUserObj] = useState<IUser>({
    username: undefined,
    _id: undefined,
    savedPosts: [],
  });

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getuser", {
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
    <UserContext.Provider value={userObj}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
