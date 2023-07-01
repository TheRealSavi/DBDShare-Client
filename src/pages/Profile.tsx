import SignIn from "../components/SignIn";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";
import { IUser } from "../types/types";
import PreviewGrid from "../components/PreviewGrid";

const Profile = () => {
  const userDetails = useContext(UserContext) as IUser;

  return (
    <div className="">
      <h1 className="text-center text-gray-200 pt-2 mb-4">Profile</h1>
      <div className="grid place-items-center">
        <SignIn />
      </div>
      {userDetails._id && (
        <PreviewGrid
          name="My builds:"
          expandable={true}
          showFromAuthorID={userDetails._id}
        />
      )}
    </div>
  );
};

export default Profile;
