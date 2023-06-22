import axios from "axios";

import BuildPreview from "./BuildPreview";
import { useContext, useEffect, useState } from "react";
import { IBuildPreview, IUser } from "../types/types";
import { UserContext } from "./UserContext";

interface IPreviewGrid {
  showMySaved?: boolean;
  showFromAuthorID?: string | undefined;
}

const PreviewGrid = (props: IPreviewGrid) => {
  const [gridItems, setGridItems] = useState<[IBuildPreview]>();

  const userDetails = useContext(UserContext) as IUser;

  useEffect(() => {
    const getGridItems = async () => {
      try {
        let response;
        if (props.showFromAuthorID != undefined) {
          response = await axios.get(
            "http://localhost:5000/users/" + props.showFromAuthorID + "/posts",
            {
              withCredentials: true,
            }
          );
        } else if (props.showMySaved) {
          response = await axios.get(
            "http://localhost:5000/users/" + userDetails._id + "/savedposts",
            { withCredentials: true }
          );
        } else {
          response = await axios.get("http://localhost:5000/posts", {
            withCredentials: true,
          });
        }

        if (props.showMySaved) {
          setGridItems(
            response.data.filter((post: IBuildPreview) => post.isSaved === true)
          );
        } else {
          setGridItems(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getGridItems();
  }, []);

  const genContent = () => {
    if (gridItems) {
      if (Object.keys(gridItems).length === 0) {
        return (
          <div className="">
            <p className="text-gray-400 text-sm mt-3">Nothing to see here...</p>
          </div>
        );
      } else {
        return gridItems.map((item) => (
          <BuildPreview {...item} key={item._id} />
        ));
      }
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="mr-2 ml-2 grid-cols-1 grid sm:grid-cols-2 2xl:grid-cols-3 gap-2">
      {genContent()}
    </div>
  );
};

export default PreviewGrid;
