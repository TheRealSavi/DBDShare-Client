import { useContext } from "react";
import PreviewGrid from "../components/PreviewGrid";
import { UserContext } from "../components/UserContext";
import { IUser } from "../types/types";

const Saved = () => {
  const userDetails = useContext(UserContext) as IUser;

  return (
    <div>
      <h1 className="text-center text-gray-200 pt-2 mb-4">Saved Posts</h1>

      {userDetails._id ? (
        <PreviewGrid name="Saved Builds:" showMySaved={true} />
      ) : (
        <h1 className="text-center text-gray-200 pt-2 mb-4">
          When you sign in with an account, your saved builds will show up here!
        </h1>
      )}
    </div>
  );
};

export default Saved;
