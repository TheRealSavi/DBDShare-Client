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

      <PreviewGrid
        name="Published Builds:"
        expandable={true}
        showFromAuthorID={id}
      />
    </div>
  );
};

export default AuthorPage;
