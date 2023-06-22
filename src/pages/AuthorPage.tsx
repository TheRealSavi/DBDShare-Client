import { useEffect, useState } from "react";
import PreviewGrid from "../components/PreviewGrid";
import { useMatch } from "react-router-dom";
import { IUser } from "../types/types";
import axios from "axios";

const AuthorPage = () => {
  const match = useMatch("/author/:id");
  const { id } = match?.params ?? {};

  const [authorUser, setAuthorUser] = useState<IUser>();

  const resolveAuthorIDtoUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/" + id);
      setAuthorUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const genAuthorString = () => {
    if (!authorUser) {
      return "Deleted User";
    }
    if (authorUser?.username) {
      return authorUser.username;
    }
    return "Error";
  };

  useEffect(() => {
    resolveAuthorIDtoUser();
  }, []);

  return (
    <div>
      <h1 className="text-center text-gray-200 pt-2 mb-4">
        {genAuthorString() + "'s Page"}
      </h1>
      <div className="ml-20 mr-20">
        <h1 className="text-gray-200 text-2xl pt-3 ml-4 mb-2">
          Published Builds:
        </h1>
        <div className="bg-slate-600 rounded-xl shadow-lg pb-8 p-1">
          <div className="grid place-items-center">
            <PreviewGrid showFromAuthorID={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
