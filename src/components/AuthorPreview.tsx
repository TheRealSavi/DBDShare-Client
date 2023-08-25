import { useEffect, useState } from "react";
import { IUser } from "../types/types";
import axios from "axios";

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
    <div className="w-40">
      <div className="flex items-center justify-left w-full">
        {authorUser?.profilePic && (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={authorUser?.profilePic}
            loading="lazy"
          />
        )}
        <p className="pl-2 overflow-clip ">{authorUser?.username}</p>
      </div>
      <div className="flex items-center justify-center w-full pt-2 gap-2">
        <p className="text-white">Followers: {followers}</p>
        <p className="text-white">Saves: {authorUser?.saveCount}</p>
        <p className="text-white">Posts: {authorUser?.postCount}</p>
      </div>
    </div>
  );
};

export default AuthorPreview;
