import { useEffect, useState } from "react";
import { IUser } from "../types/types";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiUrl } from "../apiConfig";

interface IAuthorPreview {
  authorID: string;
}

const AuthorPreview = (props: IAuthorPreview) => {
  const [authorUser, setAuthorUser] = useState<IUser>();
  const [followers, setFollowers] = useState(authorUser?.followers);

  useEffect(() => {
    const resolveAuthorIDtoUser = async () => {
      try {
        const response = await axios.get(apiUrl + "users/" + props.authorID);
        setAuthorUser(response.data);
        setFollowers(response.data.followers);
      } catch (err) {
        console.log(err);
      }
    };

    resolveAuthorIDtoUser();
  }, [props.authorID]);

  const genAuthorString = () => {
    if (!authorUser) {
      return "Deleted User";
    }
    if (authorUser?.username) {
      return authorUser.username;
    }
    return "Error";
  };

  return (
    <div className="flex w-fit flex-col ring-2 ring-slate-100 rounded-md bg-gradient-to-r from-cyan-900 to-blue-900 ring-opacity-80">
      <Link to={"/author/" + authorUser?._id}>
        <div className="flex flex-col p-2 gap-2">
          <div className="flex items-center gap-1 justify-start w-full">
            <div className="">
              {authorUser?.profilePic && (
                <img
                  className="rounded-full object-contain w-10 pl-1"
                  src={authorUser?.profilePic}
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex flex-col items-baseline gap-1 min-h-fit">
              <p className="text-white text-center text-md font-semibold pl-1">
                {genAuthorString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-600 rounded-3xl max-w-fit shadow-lg h-fit pl-4 pr-4 pb-1 bg-opacity-60">
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
      </Link>
    </div>
  );
};

export default AuthorPreview;
