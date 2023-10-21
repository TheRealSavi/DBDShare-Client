import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PerkSlot from "../components/PerkSlot";
import { UserContext } from "../components/UserContext";
import SignIn from "../components/SignIn";
import axios from "axios";
import { apiUrl } from "../apiConfig";
import {
  IKSToggleSelectionType,
  INewBuild,
  IPerk,
  RoleENUM,
} from "../types/types";
import PerkPicker from "../components/PerkPicker";

interface PerkSelectionViewerProps {
  selectedPerks: (IPerk | undefined)[];
  insertPoint: number;
  handleClick: (position: number) => void;
}

const CreateNew = () => {
  const [selectedPerks, setSelectedPerks] = useState<(IPerk | undefined)[]>([]);
  const [perkInsertPoint, setPerkInsertPoint] = useState(0);
  const [buildName, setBuildName] = useState("Name");
  const [buildType, setBuildType] = useState(RoleENUM.Survivor);
  const [description, setDescription] = useState<string>();
  const [errorShown, setErrorShown] = useState(false);
  const [queryParameters] = useSearchParams();

  const navigate = useNavigate();

  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    const newPerks = [];
    const perkID0 = queryParameters.get("perk0");
    const perkID1 = queryParameters.get("perk1");
    const perkID2 = queryParameters.get("perk2");
    const perkID3 = queryParameters.get("perk3");
    const queryBuildType = queryParameters.get("buildType") as RoleENUM;

    if (perkID0 && perkID1 && perkID2 && perkID3 && queryBuildType) {
      newPerks[0] = { _id: perkID0 } as IPerk;
      newPerks[1] = { _id: perkID1 } as IPerk;
      newPerks[2] = { _id: perkID2 } as IPerk;
      newPerks[3] = { _id: perkID3 } as IPerk;
      setBuildType(queryBuildType);
      setSelectedPerks(newPerks);
    }
  }, [queryParameters]);

  const handlePerkSelect = (newPerk: IPerk) => {
    //checks if perk is already in selectedperks
    const existingPosition = selectedPerks.indexOf(newPerk);
    //if it is removes it
    if (existingPosition != -1) {
      const newSelPerks = [...selectedPerks];
      newSelPerks[existingPosition] = undefined;

      setSelectedPerks(newSelPerks);
      setPerkInsertPoint(existingPosition);
      return;
    }
    //if its not ads it at the current insert point
    selectedPerks[perkInsertPoint] = newPerk;
    const newPerks = [...selectedPerks];

    const findNewInsertPoint = (lastPoint: number) => {
      lastPoint++;
      if (lastPoint > 3) {
        return 3;
      }
      if (newPerks[lastPoint] == undefined) {
        return lastPoint;
      } else {
        findNewInsertPoint(lastPoint);
      }
      return perkInsertPoint;
    };

    setPerkInsertPoint(findNewInsertPoint(perkInsertPoint));

    setSelectedPerks(newPerks);
  };

  const handleSave = () => {
    if (userDetails?._id == undefined) {
      window.scrollTo(0, 0);
      setErrorShown(true);
      return;
    }

    const selectedPerkIDs: string[] = [];
    selectedPerks.forEach((perk) => {
      if (perk && perk._id != "") {
        selectedPerkIDs.push(perk._id);
      }
    });

    if (selectedPerkIDs.length < 2) {
      //Must have at least 2 perks in a build
      console.log("LS2 error");
      return;
    }

    const newPost: INewBuild = {
      name: buildName,
      description: description,
      perkIDs: selectedPerkIDs,
      authorID: userDetails._id,
      type: buildType,
    };

    axios
      .post(apiUrl + "newpost", newPost, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("saved", res);
        navigate("/home");
      });
  };

  const handlePerkPickerRoleChange = (selection: IKSToggleSelectionType) => {
    setBuildType(selection.role);
    setSelectedPerks([]);
    setPerkInsertPoint(0);
  };

  return (
    <div className="">
      <div
        className={
          errorShown
            ? " z-10 blur-sm top-0 bottom-0 left-0 right-0"
            : " z-10 blur-none top-0 bottom-0 left-0 right-0"
        }
      >
        <h1 className="text-center text-gray-200 pt-2 mb-2">Make a Post</h1>
        <div className="flex pl-2 pr-2 flex-row place-content-center flex-wrap gap-2">
          <div className="bg-gray-700 rounded-xl shadow-lg p-2 h-1/3 flex-shrink">
            <p className="pl-1 text-gray-300">Build Name:</p>
            <input
              className=" bg-gray-600 rounded-xl text-center shadow-md text-gray-300"
              type="text"
              id="buildName"
              value={buildName}
              onChange={(e) => {
                setBuildName(e.target.value);
              }}
            />
            <div className="pt-3">
              <PerkSelectionViewer
                selectedPerks={selectedPerks}
                insertPoint={perkInsertPoint}
                handleClick={(position) => {
                  setPerkInsertPoint(position);
                }}
              />
            </div>

            <p className="pl-1 pt-3 text-gray-300">Build Description:</p>
            <textarea
              className=" bg-gray-600 rounded-xl w-full h-40 shadow-md text-gray-300"
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="">
            <PerkPicker
              selectedPerks={selectedPerks}
              role={buildType}
              onRoleChange={handlePerkPickerRoleChange}
              handlePerkSelect={(perk) => {
                handlePerkSelect(perk);
              }}
            />
          </div>
        </div>
      </div>

      <div className="">
        {errorShown ? (
          <div className="absolute top-0 w-full h-screen z-20">
            <div className="flex items-center h-full justify-center">
              <div className="flex flex-col">
                <button
                  className="button2 text-red-500 bg-gray-800 pl-3 pr-3 pt-2 pb-2 hover:text-white hover:bg-red-500 w-fit"
                  onClick={() => {
                    setErrorShown(false);
                  }}
                >
                  X
                </button>
                <SignIn />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="sticky bottom-0 bg-slate-800 p-2">
        <div className="flex place-content-center">
          <button className="button1" onClick={handleSave}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

const PerkSelectionViewer = (props: PerkSelectionViewerProps) => {
  const perkClicked = (slotNumber: number) => {
    props.handleClick(slotNumber);
    return (event: React.MouseEvent) => {
      event.preventDefault;
    };
  };

  const perkSlots = [];
  for (let i = 0; i < 4; i++) {
    perkSlots.push(
      <PerkSlot
        perk={props.selectedPerks[i]}
        key={i}
        slotNumber={i}
        isSelected={props.insertPoint == i}
        handleClick={perkClicked}
        allowHover={true}
      />
    );
  }

  return (
    <div className=" bg-gray-600 h-fit shadow-xl rounded-lg">
      <div className="flex gap-2 p-1 grid-cols-4 rounded-lg justify-center place-items-center">
        {perkSlots.map((slot) => {
          return slot;
        })}
      </div>
    </div>
  );
};

export default CreateNew;
