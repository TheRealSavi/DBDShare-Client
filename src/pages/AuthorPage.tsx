import { useContext, useEffect, useState } from "react";
import PreviewGrid from "../components/PreviewGrid";
import { useMatch } from "react-router-dom";
import { IUser } from "../types/types";
import axios from "axios";
import Tooltip from "../components/Tooltip";
import SignIn from "../components/SignIn";
import { UserContext } from "../components/UserContext";

interface IAuthorPage {
  authorID?: string;
}

const AuthorPage = (props: IAuthorPage) => {
  const match = useMatch("/author/:id");
  let { id } = match?.params ?? {};

  if (id == undefined) {
    id = props.authorID;
  }

  const [authorUser, setAuthorUser] = useState<IUser>();
  const [followers, setFollowers] = useState(authorUser?.followers);
  const [followed, setFollowed] = useState<boolean>();
  const [shareSuccess, setShareSuccess] = useState<boolean>();

  const userDetails = useContext(UserContext) as IUser;

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
        setFollowers(response.data.followers);
      } catch (err) {
        console.log(err);
      }
    };

    resolveAuthorIDtoUser();
  }, [id]);

  useEffect(() => {
    if (authorUser?._id) {
      if (followed == undefined) {
        const resolveFollowed = async () => {
          try {
            console.log("resolving");
            const response = await axios.get(
              import.meta.env.VITE_API_URL + "following/",
              { withCredentials: true }
            );
            const tempfollowing = response.data as Array<string | undefined>;
            if (tempfollowing.indexOf(authorUser._id) !== -1) {
              setFollowed(true);
              console.log("resolving true");
            } else {
              setFollowed(false);
              console.log("resolving false");
            }
          } catch (err) {
            console.log(err);
          }
        };
        resolveFollowed();
      }
    }
  }, [followed, authorUser]);

  const handleClickedFollow = async () => {
    if (followed) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "unfollow",
          {
            authorID: authorUser?._id,
          },
          { withCredentials: true }
        );
        if (response.data.message == "unfollowed") {
          setFollowed(false);
          if (followers) {
            setFollowers(followers - 1);
          } else {
            setFollowers(0);
          }
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "follow",
          {
            authorID: authorUser?._id,
          },
          { withCredentials: true }
        );
        if (response.data.message == "followed") {
          setFollowed(true);
          if (followers) {
            setFollowers(followers + 1);
          } else {
            setFollowers(1);
          }
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickedShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("Content copied to clipboard!");
      setShareSuccess(true);
      setTimeout(() => {
        setShareSuccess(false);
      }, 1300);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setShareSuccess(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-gray-200 pt-2 mb-4">
        {genAuthorString() + "'s Page"}
      </h1>
      {authorUser?._id == userDetails._id && (
        <div className="absolute z-50 top-2 right-2 opacity-10 hover:opacity-100">
          <SignIn />
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        {authorUser?.profilePic && (
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={authorUser?.profilePic}
            loading="lazy"
          />
        )}
      </div>
      <div className="flex justify-center items-center space-x-10">
        <p className="text-white text-center">Followers: {followers}</p>
        <p className="text-white text-center">Saves: {authorUser?.saveCount}</p>
        <p className="text-white text-center">Posts: {authorUser?.postCount}</p>
      </div>
      <div className="flex items-center justify-evenly text-center">
        <div className="bg-gradient-to-r from-cyan-900 to-blue-900 w-fit mt-5 rounded-3xl shadow-lg h-fit">
          <div className="grid grid-cols-2 gap-4 ml-3 mr-3">
            <button
              className="mt-1 mb-1 button2 text-white"
              onClick={handleClickedFollow}
            >
              {followed ? "Unfollow" : "Follow"}
            </button>
            <div className="">
              <button
                className="mt-1 mb-1 button2 text-white"
                onClick={handleClickedShare}
              >
                Share
              </button>
              {shareSuccess ? (
                <Tooltip requireHover={false}>
                  <p>Copied to clipboard!</p>
                </Tooltip>
              ) : (
                <div></div>
              )}
            </div>
          </div>
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
