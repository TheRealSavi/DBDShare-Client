import PreviewGrid from "../components/PreviewGrid";
import { useMatch } from "react-router-dom";
import { IUser, PreviewGridQueryType } from "../types/types";
import axios from "axios";
import { apiUrl } from "../apiConfig";
import { useEffect, useState } from "react";

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
        const response = await axios.get(apiUrl + "users/" + id);
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
            const response = await axios.get(apiUrl + "following/", {
              withCredentials: true,
            });
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
          apiUrl + "unfollow",
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
          apiUrl + "follow",
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
      <div className="pt-4">
        <div className="flex items-start gap-2 justify-center w-full">
          <div className="">
            {authorUser?.profilePic && (
              <img
                className="rounded-full object-contain h-32"
                src={authorUser?.profilePic}
                loading="lazy"
              />
            )}
          </div>

          <div className="flex flex-col items-start gap-2 min-h-fit">
            <p className="text-white text-center text-xl pl-3">
              {genAuthorString()}
            </p>

            <div className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-3xl max-w-full shadow-lg h-fit pl-4 pr-4 pb-1 pt-1">
              <div className="flex gap-3 items-center">
                <div className="">
                  <p className="text-white opacity-50 text-center min-w-fit">
                    Followers
                  </p>
                  <p className="text-white text-center">{followers}</p>
                </div>
                <div className="">
                  <p className="text-white opacity-50 text-center min-w-fit">
                    Saves
                  </p>
                  <p className="text-white text-center">
                    {authorUser?.saveCount}
                  </p>
                </div>
                <div className="">
                  <p className="text-white opacity-50 text-center min-w-fit">
                    Posts
                  </p>
                  <p className="text-white text-center">
                    {authorUser?.postCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-center m-2">
        <div className="bg-gradient-to-r from-cyan-900 to-blue-900 w-fit rounded-3xl shadow-lg h-fit pl-2 pr-2">
          <div className="flex items-center justify-between gap-2">
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
              {shareSuccess ? <></> : <div></div>}
            </div>
          </div>
        </div>
      </div>

      <div>
        <PreviewGrid
          name="Published Builds:"
          queryType={PreviewGridQueryType.authorPosts}
          showFromAuthorID={id}
        />
      </div>
    </div>
  );
};

export default AuthorPage;
