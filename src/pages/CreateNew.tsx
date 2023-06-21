import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import emptySlot from "../assets/blank.png";
import perks from "../components/PerkList";
import PerkSlot from "../components/PerkSlot";
import KSToggle from "../components/KSToggle";
import { UserContext } from "../components/UserContext";
import SignIn from "../components/SignIn";
import axios from "axios";
import { IKSToggleSelectionType, INewBuild, IUser } from "../types/types";

interface ItemSlotProps {
  type: boolean;
}

interface PerkPickerProps {
  selectedPerks: Array<string>;
  perkType: string;
  handlePerkSelect: (perk: string) => void;
}

interface PerkSelectionViewerProps {
  selectedPerks: Array<string>;
  insertPoint: number;
  handleClick: (position: number) => void;
}

const CreateNew = () => {
  const [selectedPerks, setSelectedPerks] = useState(["", "", "", ""]);
  const [perkInsertPoint, setPerkInsertPoint] = useState(0);
  const [buildName, setBuildName] = useState("Name");
  const [buildType, setBuildType] = useState("survivor");
  const [description, setDescription] = useState("");
  const [errorShown, setErrorShown] = useState(false);
  const [queryParameters] = useSearchParams();

  const navigate = useNavigate();

  const userDetails = useContext(UserContext) as IUser;

  useEffect(() => {
    const newPerks = ["", "", "", ""];
    const perk0 = queryParameters.get("perk0");
    const perk1 = queryParameters.get("perk1");
    const perk2 = queryParameters.get("perk2");
    const perk3 = queryParameters.get("perk3");
    const queryBuildType = queryParameters.get("buildType");

    if (perk0 && perk1 && perk2 && perk3 && queryBuildType) {
      newPerks[0] = perk0;
      newPerks[1] = perk1;
      newPerks[2] = perk2;
      newPerks[3] = perk3;
      setBuildType(queryBuildType);
    }
    setSelectedPerks(newPerks);
  }, []);

  const handlePerkSelect = (newPerk: string) => {
    const existingPosition = selectedPerks.indexOf(newPerk);

    if (existingPosition != -1) {
      selectedPerks[existingPosition] = "";
      setSelectedPerks([...selectedPerks]);
      setPerkInsertPoint(existingPosition);
      return;
    }

    selectedPerks[perkInsertPoint] = newPerk;
    const newPerks = [...selectedPerks];

    const findNewInsertPoint = (lastPoint: number) => {
      lastPoint++;
      if (lastPoint > 3) {
        return 3;
      }
      if (newPerks[lastPoint] == "") {
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
    if (userDetails._id == undefined) {
      setErrorShown(true);
      return;
    }

    const newPost: INewBuild = {
      name: buildName,
      description: description,
      perks: selectedPerks,
      authorID: userDetails._id,
      saves: 0,
      type: buildType,
    };

    axios.post("http://localhost:5000/newpost", newPost).then((res) => {
      console.log("saved", res);
      navigate("/home");
    });
  };

  const handleKSToggle = (selection: IKSToggleSelectionType) => {
    setBuildType(selection.str);
    setSelectedPerks(["", "", "", ""]);
    setPerkInsertPoint(0);
  };

  return (
    <div>
      <h1 className="text-center text-gray-200">Create New</h1>
      <div className="pl-2 pr-2 sm:grid sm:grid-cols-2 gap-2">
        <div className="bg-gray-700 rounded-xl shadow-lg p-2 mt-4 m-2 pr-4">
          <p className="pl-2 text-gray-300">Build Name:</p>
          <input
            className="ml-1 bg-gray-600 rounded-xl text-center shadow-md text-gray-300"
            type="text"
            id="buildName"
            value={buildName}
            onChange={(e) => {
              setBuildName(e.target.value);
            }}
          />
          <div className="mt-5 pb-2 bg-gray-600 max-w-fit shadow-xl rounded-lg">
            <PerkSelectionViewer
              selectedPerks={selectedPerks}
              insertPoint={perkInsertPoint}
              handleClick={(position) => {
                setPerkInsertPoint(position);
              }}
            />
          </div>

          <p className="pl-2 pt-5 text-gray-300">Build Description:</p>
          <textarea
            className="ml-1 bg-gray-600 rounded-xl w-full h-40 shadow-md text-gray-300"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className="absolute right-6 mt-5">
          <KSToggle start={buildType} onClick={handleKSToggle} />
        </div>

        <div className="bg-gray-700 rounded-xl shadow-lg p-2 mt-4 m-2 pb-4 h-fit">
          <PerkPicker
            selectedPerks={selectedPerks}
            perkType={buildType}
            handlePerkSelect={(perk) => {
              handlePerkSelect(perk);
            }}
          />
        </div>

        <div className="">
          <div className="mt-5 grid place-items-center">
            <button className="button1" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {errorShown ? (
          <div className="grid place-items-center absolute top-1/4 w-full">
            <div className="w-1/2">
              <SignIn />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

const PerkPicker = (props: PerkPickerProps) => {
  const perkList = [""];
  if (props.perkType == "survivor") {
    Object.values(perks.survivor).map((perk, i) => {
      perkList[i] = perk;
    });
  } else {
    Object.values(perks.killer).map((perk, i) => {
      perkList[i] = perk;
    });
  }

  const perkPicked = (slotNumber: number) => {
    props.handlePerkSelect(perkList[slotNumber]);
    return (event: React.MouseEvent) => {
      event.preventDefault;
    };
  };

  return (
    <div className="">
      <p className="pl-2 text-gray-300">Select the perks:</p>
      <div className="">
        <div className="mt-3 bg-gray-600 shadow-xl rounded-lg h-96 overflow-y-scroll">
          <div className="p-2 grid gap-2 grid-cols-5">
            {perkList.map((perk, i) => {
              return (
                <PerkSlot
                  perkImage={perk}
                  key={i}
                  slotNumber={i}
                  isSelected={props.selectedPerks.includes(perk)}
                  handleClick={perkPicked}
                />
              );
            })}
          </div>
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
        perkImage={props.selectedPerks[i]}
        key={i}
        slotNumber={i}
        isSelected={props.insertPoint == i}
        handleClick={perkClicked}
      />
    );
  }

  return (
    <div className="grid h-full place-items-top pt-2">
      <div className="max-w-2xl">
        <div className="h-43 pl-2 pr-2 grid gap-2 grid-cols-4">
          {perkSlots.map((slot) => {
            return slot;
          })}
        </div>
      </div>
    </div>
  );
};

const ItemSelectionViewer = () => {
  return (
    <div className="flex max-w-3xl h-36 pl-12 pr-2">
      <ItemSlot type={false} />
      <ItemSlot type={true} />
      <ItemSlot type={true} />
    </div>
  );
};

const ItemSlot = (props: ItemSlotProps) => {
  return (
    <div
      className={
        props.type
          ? "relative m-0 mt-6 w-fit-content h-20"
          : "relative m-0 mt-4 w-fit-content h-28"
      }
    >
      <img className="h-full object-contain rotate-45 " src={emptySlot}></img>
    </div>
  );
};

export default CreateNew;
