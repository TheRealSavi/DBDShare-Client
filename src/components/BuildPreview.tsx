import { useContext, useEffect, useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import PerkSlot from "./PerkSlot";
import survivorImg from "../assets/survivor.png";
import killerImg from "../assets/killer.png";
import { IBuildPreview, IPerk, IUser, RoleENUM } from "../types/types";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";

import AuthorPreview from "./AuthorPreview";

interface ISavedCountProps {
  isSaved: boolean;
  savedCount: number;
  buildId: string;
}

interface IAuthorInfoProps {
  authorID: string;
}

const AuthorInfo = (props: IAuthorInfoProps) => {
  const [authorUser, setAuthorUser] = useState<IUser>();

  useEffect(() => {
    const resolveAuthorIDtoUser = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "users/" + props.authorID
        );
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
    <div>
      <p className="absolute text-gray-400 text-sm bottom-2 pl-1">Author:</p>
      <Link
        to={"/author/" + authorUser?._id}
        className="absolute text-gray-300 text-sm bottom-2 left-12 pl-4  hover:text-gray-100"
      >
        {genAuthorString()}
      </Link>
    </div>
  );
};

const SavedCount = (props: ISavedCountProps) => {
  const [isSaved, setIsSaved] = useState(props.isSaved);
  const [saves, setSaves] = useState(props.savedCount);

  const userDetails = useContext(UserContext) as IUser;

  const savePost = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "savepost",
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
        import.meta.env.VITE_API_URL + "unsavepost",
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
    if (userDetails._id) {
      if (isSaved) {
        unsavePost();
      } else {
        savePost();
      }
    }
  };

  return (
    <div className="absolute top-0 right-0 w-1/3 h-10 flex justify-end">
      <p className="text-gray-400 mr-2">{saves}</p>
      <BsFillBookmarkHeartFill
        className={
          isSaved
            ? "min-w-fit mt-1 mr-2 text-amber-400 hover:text-red-400"
            : "min-w-fit mt-1 mr-2 text-gray-300 hover:text-amber-100 hover:rotate-12"
        }
        onClick={() => {
          handleClickedSaved();
        }}
      />
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

  return (
    <div className="relative mb-3 mt-1 ml-2 mr-2 min-w-sm max-w-md">
      <h1 className="ml-2 text-gray-100">{build.name}</h1>
      <SavedCount
        isSaved={build.isSaved}
        buildId={build._id}
        savedCount={build.saves}
      />

      <div className="relative h-56 w-full bg-gradient-to-br  from-gray-600 to-gray-700 rounded-xl shadow-lg">
        <div className="grid grid-rows-2 h-full place-items-top p-2">
          <div className="flex gap-2 pl-1 pr-1 grid-cols-4 rounded-lg justify-center place-items-center">
            {perkSlots.map((slot) => {
              return slot;
            })}
          </div>
          <div className="pt-2">
            <p className="text-gray-400 text-sm pl-1">Description: </p>
            <div className="overflow-hidden h-12">
              <p className="text-xs text-gray-100 pl-1 pr-1">
                {build.description}
              </p>
            </div>
            <div className="group">
              <AuthorInfo authorID={build.authorID} />
              <div className="relative z-[100]">
                <Tooltip requireHover={true}>
                  <AuthorPreview authorID={build.authorID}></AuthorPreview>
                </Tooltip>
              </div>
            </div>
            <img
              className="absolute h-8 bottom-2 right-2"
              src={getBuildTypeImg()}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildPreview;
