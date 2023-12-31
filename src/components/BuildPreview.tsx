import { useContext, useEffect, useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import PerkSlot from "./PerkSlot";
import survivorImg from "../assets/survivor.png";
import killerImg from "../assets/killer.png";
import { IBuildPreview, IPerk, IUser, RoleENUM } from "../types/types";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import {
  ConfigProvider,
  Dropdown,
  MenuProps,
  Popconfirm,
  Popover,
  theme,
} from "antd";
import { apiUrl } from "../apiConfig";
import { BsThreeDots } from "react-icons/bs";
import { TbMessageReport } from "react-icons/tb";
import { MdOutlineIosShare } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AuthorPreview from "./AuthorPreview";

interface ISavedCountProps {
  isSaved: boolean;
  savedCount: number;
  buildId: string;
  authorId: string;
}

interface IAuthorInfoProps {
  authorID: string;
}

const AuthorInfo = (props: IAuthorInfoProps) => {
  const [authorUser, setAuthorUser] = useState<IUser>();

  useEffect(() => {
    const resolveAuthorIDtoUser = async () => {
      try {
        const response = await axios.get(apiUrl + "users/" + props.authorID);
        setAuthorUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    resolveAuthorIDtoUser();
  }, [props.authorID]);

  const genAuthorString = () => {
    if (!authorUser) {
      return "...";
    }
    if (authorUser?.username) {
      return authorUser.username;
    }
    return "Error";
  };

  return (
    <div className="flex gap-2">
      <p className="text-gray-400 text-sm">Author:</p>
      <Link
        to={"/author/" + authorUser?._id}
        className=" text-gray-300 text-sm hover:text-gray-100"
      >
        {genAuthorString()}
      </Link>
    </div>
  );
};

const SavedCount = (props: ISavedCountProps) => {
  const [isSaved, setIsSaved] = useState(props.isSaved);
  const [saves, setSaves] = useState(props.savedCount);

  const { userDetails } = useContext(UserContext);

  const savePost = async () => {
    try {
      await axios.post(
        apiUrl + "savepost",
        {
          postId: props.buildId,
        },
        { withCredentials: true }
      );
      setIsSaved(true);
      setSaves(saves + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const unsavePost = async () => {
    try {
      await axios.post(
        apiUrl + "unsavepost",
        {
          postId: props.buildId,
        },
        { withCredentials: true }
      );
      setIsSaved(false);
      setSaves(saves - 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickedSaved = () => {
    if (userDetails?._id) {
      if (isSaved) {
        unsavePost();
      } else {
        savePost();
      }
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(apiUrl + "posts/" + props.buildId, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          className="w-full"
          onClick={() => {
            console.log("I aint doin alat");
          }}
        >
          Report
        </button>
      ),
      icon: <TbMessageReport />,
    },
    {
      key: "2",
      label: <button className="w-full"> Share </button>,
      icon: <MdOutlineIosShare />,
    },
    userDetails?._id == props.authorId
      ? {
          key: "3",
          label: <button className="w-full"> Edit </button>,
          icon: <MdEdit />,
        }
      : null,
    userDetails?._id == props.authorId
      ? {
          key: "4",
          danger: true,
          label: (
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                components: {
                  Popover: {
                    colorBgElevated: "rgba(26, 67, 118, 1)",
                    borderRadius: 32,
                  },
                },
              }}
            >
              <Popconfirm
                title="Are you sure you want to delete this post?"
                description="This can not be undone."
                onConfirm={handleDeletePost}
                okText="Delete"
                cancelText="Cancel"
                style={{ borderRadius: "8px" }}
              >
                <button className="w-full"> Delete </button>
              </Popconfirm>
            </ConfigProvider>
          ),
          icon: <MdDelete />,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="flex gap-2 items-center pr-1 overflow-clip">
      <p className="text-gray-400 pl-2">{saves}</p>
      <BsFillBookmarkHeartFill
        className={
          isSaved
            ? "  text-amber-400 hover:text-red-400"
            : "  text-gray-300 hover:text-amber-100 hover:rotate-12"
        }
        onClick={() => {
          handleClickedSaved();
        }}
      />
      <Dropdown menu={{ items }} trigger={["click"]}>
        <BsThreeDots className="text-gray-300 hover:text-blue-300 ml-2 text-lg"></BsThreeDots>
      </Dropdown>
    </div>
  );
};

const BuildPreview = (build: IBuildPreview) => {
  const perkSlots = [];
  for (let i = 0; i < 4; i++) {
    perkSlots.push(
      <PerkSlot
        perk={{ _id: build.perkIDs[i] } as IPerk}
        key={i}
        slotNumber={i}
        isSelected={false}
        allowHover={true}
      />
    );
  }

  const getBuildTypeImg = () => {
    if (build.type == RoleENUM.Survivor) {
      return survivorImg;
    } else {
      return killerImg;
    }
  };

  const handleSelfClicked = () => {
    if (build.handleClick) {
      build.handleClick(build);
    }
  };

  return (
    <div className="mb-3 mt-1 ml-2 mr-2 min-w-sm max-w-md flex-none">
      <div className="flex justify-between items-center">
        <h1 className="overflow-clip ml-1 text-sm sm:text-lg text-gray-100">
          {build.name}
        </h1>
        <SavedCount
          isSaved={build.isSaved}
          buildId={build._id}
          savedCount={build.saves}
          authorId={build.authorID}
        />
      </div>

      <div
        className="h-fit w-full bg-gradient-to-br  from-gray-600 to-gray-700 rounded-xl shadow-lg overflow-clip"
        onClick={handleSelfClicked}
      >
        <div className="flex flex-col p-2">
          <div className="w-full flex-none flex gap-2 p-1 grid-cols-4 rounded-lg justify-center place-items-center">
            {perkSlots.map((slot) => {
              return slot;
            })}
          </div>
          <div className="pt-1">
            <p className="text-gray-400 text-sm pl-2">Description: </p>
            <div
              className={
                build.full ? "overflow-hideen" : "overflow-hidden h-12"
              }
            >
              <p
                className={
                  build.full
                    ? "text-sm text-gray-100 pl-2 pr-2"
                    : "text-xs text-gray-100 pl-2 pr-2"
                }
              >
                {build.description}
              </p>
            </div>

            <div className="pt-1">
              <div className="flex justify-between items-end pl-2 pr-0">
                <Popover
                  content={
                    <div>
                      <AuthorPreview authorID={build.authorID}></AuthorPreview>
                    </div>
                  }
                  arrow={false}
                >
                  <div>
                    <AuthorInfo authorID={build.authorID} />
                  </div>
                </Popover>

                <img className="h-8" src={getBuildTypeImg()}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildPreview;
