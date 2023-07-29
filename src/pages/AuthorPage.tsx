import { useEffect, useState } from "react";
import PreviewGrid from "../components/PreviewGrid";
import { useMatch } from "react-router-dom";
import { IUser } from "../types/types";
import axios from "axios";

const AuthorPage = () => {
  const match = useMatch("/author/:id");
  const { id } = match?.params ?? {};

  const [authorUser, setAuthorUser] = useState<IUser>();

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
    const resolveAuthorIDtoUser = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "users/" + id
        );
        setAuthorUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    resolveAuthorIDtoUser();
  }, [id]);

  const handleClickedFollow = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "follow",
        {
          authorID: authorUser?._id,
        },
        { withCredentials: true }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickedShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("Content copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div>
      <h1 className="text-center text-gray-200 pt-2 mb-4">
        {genAuthorString() + "'s Page"}
      </h1>
      <div className="flex items-center justify-center w-full">
        {authorUser?.profilePic && (
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={authorUser?.profilePic}
            loading="lazy"
          />
        )}
      </div>
      <div className="flex items-center justify-center space-x-4">
        <p className="text-white">Followers: {authorUser?.followers}</p>
        <p className="text-white">Saves: 105</p>
        <p className="text-white">Posts: 2</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 w-fit mt-5 rounded-3xl shadow-lg h-fit">
          <button
            className="ml-4 mr-4 mt-1 mb-1 button1"
            onClick={handleClickedFollow}
          >
            Follow
          </button>
          <button
            className="ml-4 mr-4 mt-1 mb-1 button1"
            onClick={handleClickedShare}
          >
            Share
          </button>
        </div>
      </div>

      <PreviewGrid
        name="Published Builds:"
        expandable={true}
        showFromAuthorID={id}
      />
    </div>
  );
};

export default AuthorPage;
