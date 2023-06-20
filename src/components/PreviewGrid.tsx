import axios from "axios";

import BuildPreview from "./BuildPreview";
import { useContext, useEffect, useState } from "react";
import { IAuthor, IBuildPreview, IUser } from "../types/types";
import { UserContext } from "./UserContext";

interface IPreviewGrid {
  showMySaved?: boolean;
  showFromAuthorID?: string | undefined;
}

const PreviewGrid = (props: IPreviewGrid) => {
  const [gridItems, setGridItems] = useState<[IBuildPreview]>();

  const userDetails = useContext(UserContext) as IUser;

  const resolveAuthor = async (build: IBuildPreview) => {
    if (build.author) {
      return build;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/users/" + build.authorID
      );
      build.author = response.data as IAuthor;
      return build;
    } catch (err) {
      console.log(err);
      build.author = { username: "Error" } as IAuthor;
      return build;
    }
  };

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

  return (
    <div className="mr-2 ml-2 grid-cols-1 grid sm:grid-cols-2 2xl:grid-cols-3 gap-2">
      {gridItems &&
        gridItems.map((item) => <BuildPreview {...item} key={item._id} />)}
    </div>
  );
};

export default PreviewGrid;
