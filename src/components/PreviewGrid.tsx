import axios from "axios";

import BuildPreview from "./BuildPreview";
import { useContext, useEffect, useState } from "react";
import { IBuildPreview, IUser } from "../types/types";
import { UserContext } from "./UserContext";
import { Pagination, PaginationProps, Spin } from "antd";

interface IPreviewGrid {
  showMySaved?: boolean;
  showFromAuthorID?: string | undefined;
  contents?: JSX.Element[];
  name: string;
}

const PreviewGrid = (props: IPreviewGrid) => {
  const [contents, setContents] = useState<JSX.Element[]>();
  const [contentPos, setContentPos] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const userDetails = useContext(UserContext) as IUser;

  useEffect(() => {
    const getGridItems = async () => {
      let recieved = [] as IBuildPreview[];
      try {
        let response;
        if (props.showFromAuthorID != undefined) {
          response = await axios.get(
            "https://api.gibbonsiv.com/" +
              "users/" +
              props.showFromAuthorID +
              "/posts",
            {
              withCredentials: true,
            }
          );
        } else if (props.showMySaved) {
          response = await axios.get(
            "https://api.gibbonsiv.com/" +
              "users/" +
              userDetails._id +
              "/savedposts",
            { withCredentials: true }
          );
        } else {
          response = await axios.get("https://api.gibbonsiv.com/" + "posts/", {
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
        setIsLoading(false);
        setIsEmpty(true);
        setContents([
          <p key="0" className="text-gray-400 text-lg">
            Error reaching API...
          </p>,
        ]);
        return;
      }

      setIsLoading(false);
      if (Object.keys(recieved).length === 0) {
        setIsEmpty(true);
        setContents([
          <p key="0" className="text-gray-400 text-lg">
            Nothing to see here...
          </p>,
        ]);
      } else {
        setIsEmpty(false);
        setContents(
          recieved.map((item) => <BuildPreview {...item} key={item._id} />)
        );
      }
    };

    getGridItems();
  }, [props.showFromAuthorID, props.showMySaved, userDetails._id]);

  const handlePageChange: PaginationProps["onChange"] = (
    newPage,
    newPageSize
  ) => {
    setPage(newPage);
    setPageSize(newPageSize);
    setContentPos(newPageSize * (newPage - 1));
  };

  return (
    <div className="p-2">
      <div className="flex">
        <h1 className="grow text-gray-200 text-2xl">{props.name}</h1>
      </div>
      <Spin spinning={isLoading}>
        <div className="p-1 rounded-xl shadow-md">
          <div className="">
            <div className="sm:flex place-content-center flex-wrap">
              {contents?.slice(contentPos, contentPos + pageSize)}
            </div>
          </div>
          {!isEmpty && (
            <div className="flex place-content-center">
              <Pagination
                current={page}
                pageSize={pageSize}
                total={contents?.length}
                onChange={handlePageChange}
                showSizeChanger={true}
                pageSizeOptions={[2, 4, 6, 12]}
              ></Pagination>
            </div>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default PreviewGrid;
