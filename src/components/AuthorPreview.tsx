import { useEffect, useState } from "react";
import { IUser } from "../types/types";
import axios from "axios";
import { Link } from "react-router-dom";

interface IAuthorPreview {
  authorID: string;
}

const AuthorPreview = (props: IAuthorPreview) => {
  const [authorUser, setAuthorUser] = useState<IUser>();
  const [followers, setFollowers] = useState(authorUser?.followers);

  useEffect(() => {
    const resolveAuthorIDtoUser = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "users/" + props.authorID
        );
        setAuthorUser(response.data);
        setFollowers(response.data.followers);
      } catch (err) {
        console.log(err);
      }
    };

    resolveAuthorIDtoUser();
  }, [props.authorID]);

  return (
    <div className="flex w-60 flex-col ring-2 ring-slate-100 rounded-md opacity">
      <Link to={"/author/" + authorUser?._id}>
        <div className="flex items-center justify-left w-full ">
          {authorUser?.profilePic && (
            <img
              className="m-3 w-12 h-12 rounded-full object-cover"
              src={authorUser?.profilePic}
              loading="lazy"
            />
          )}
          <p className="m-3 overflow-clip text-base ">{authorUser?.username}</p>
        </div>
        <div className="flex grid-flow-col grid-cols-3 place-content-between w-full pb-4 text-center p-2 text-sm">
          <p className="text-white">Followers: {followers}</p>
          <p className="text-white">Saves: 105</p>
          <p className="text-white">Posts: 2</p>
        </div>
        <div className="pb-1 pl-1">
          <p className="text-xs opacity-40">Member since: Aug 1st, 2023</p>
        </div>
      </Link>
    </div>
  );
};

export default AuthorPreview;
