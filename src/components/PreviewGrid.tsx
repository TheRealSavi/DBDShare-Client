import axios from "axios";

import BuildPreview from "./BuildPreview";
import { useContext, useEffect, useState } from "react";
import { IBuildPreview, IUser } from "../types/types";
import { UserContext } from "./UserContext";

interface IPreviewGrid {
  showMySaved?: boolean;
  showFromAuthorID?: string | undefined;
  name: string;
  expandable: boolean;
}

const PreviewGrid = (props: IPreviewGrid) => {
  const [expanded, setExpanded] = useState(!props.expandable);
  const [expandable, setExpandable] = useState(props.expandable);
  const [contents, setContents] = useState<JSX.Element[]>();

  const userDetails = useContext(UserContext) as IUser;

  useEffect(() => {
    const getGridItems = async () => {
      let recieved: IBuildPreview[];
      try {
        let response;
        if (props.showFromAuthorID != undefined) {
          response = await axios.get(
            import.meta.env.VITE_API_URL +
              "users/" +
              props.showFromAuthorID +
              "/posts",
            {
              withCredentials: true,
            }
          );
        } else if (props.showMySaved) {
          response = await axios.get(
            import.meta.env.VITE_API_URL +
              "users/" +
              userDetails._id +
              "/savedposts",
            { withCredentials: true }
          );
        } else {
          response = await axios.get(import.meta.env.VITE_API_URL + "posts/", {
            withCredentials: true,
          });
        }

        if (props.showMySaved) {
          recieved = response.data.filter(
            (post: IBuildPreview) => post.isSaved === true
          );
        } else {
          recieved = response.data;
        }
      } catch (err) {
        console.log(err);
        recieved = [] as IBuildPreview[];
      }

      if (Object.keys(recieved).length === 0) {
        setContents([
          <p key="0" className="text-gray-400 text-lg">
            Nothing to see here...
          </p>,
        ]);
        setExpandable(false);
        setExpanded(true);
      } else {
        setContents(
          recieved.map((item) => <BuildPreview {...item} key={item._id} />)
        );
      }
    };

    getGridItems();
  }, [props.showFromAuthorID, props.showMySaved, userDetails._id]);

  return (
    <div className="ml-0 mr-0 md:ml-12 md:mr-12 mt-3 ">
      <div className="flex mr-3">
        <h1 className="grow text-gray-200 text-2xl pt-3 ml-4 mb-2">
          {props.name}
        </h1>
      </div>

      <div className="pl-1 pr-3 pt-1 pb-1 sm:bg-slate-600 rounded-xl shadow-md overflow-x-auto overflow-y-hidden overscroll-contain snap-x snap-mandatory">
        {expanded ? (
          <div className="flex w-full items-center justify-center">
            <div className="mr-2 ml-2 grid-cols-1 grid sm:grid-cols-2 2xl:grid-cols-4 gap-2 ">
              {contents}
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <div className="mr-2 ml-2 grid-cols-1 grid sm:grid-cols-2 2xl:grid-cols-4 gap-2 ">
              {contents?.slice(0, 4)}
            </div>
          </div>
        )}
        {expandable ? (
          <div className="pl-5 pr-5">
            <button
              className="text-gray-200 button2 mt-4 mb-2 flex items-center justify-center w-full"
              onClick={() => {
                if (expanded) {
                  setExpanded(false);
                } else {
                  setExpanded(true);
                }
              }}
            >
              {expanded ? "Show Less -" : "Show More +"}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PreviewGrid;
