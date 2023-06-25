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
        <PreviewGrid
          expandable={false}
          name="Saved Builds:"
          showMySaved={true}
        />
      ) : (
        <h1 className="text-center text-gray-200 pt-2 mb-4">
          Must be signed in to save posts
        </h1>
      )}
    </div>
  );
};

export default Saved;
