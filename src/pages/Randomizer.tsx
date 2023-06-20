import { useState } from "react";
import { Link } from "react-router-dom";
import perks from "../components/PerkList";
import PerkSlot from "../components/PerkSlot";
import KSToggle from "../components/KSToggle";
import { IKSToggleSelectionType } from "../types/types";

const Randomizer = () => {
  const [randomPerks, setRandomPerks] = useState(["", "", "", ""]);
  const [lockedPerks, setLockedPerks] = useState([false, false, false, false]);
  const [buildType, setBuildType] = useState("survivor");

  const perkList = ["", "", "", ""];
  if (buildType == "survivor") {
    Object.values(perks.survivor).map((perk, i) => {
      perkList[i] = perk;
    });
  } else {
    Object.values(perks.killer).map((perk, i) => {
      perkList[i] = perk;
    });
  }

  const getPerks = () => {
    const perksToUse = ["", "", "", ""];
    const perkListCopy = [...perkList];

    for (let i = 0; i < lockedPerks.length; i++) {
      if (lockedPerks[i] === true) {
        perksToUse[i] = randomPerks[i];
        const index = perkListCopy.indexOf(randomPerks[i]);
        if (index > -1) {
          perkListCopy.splice(index, 1);
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      const toAdd =
        perkListCopy[Math.floor(Math.random() * perkListCopy.length)];
      if (lockedPerks[i] === false) {
        perksToUse[i] = toAdd;
      }
      const index = perkListCopy.indexOf(toAdd);
      if (index > -1) {
        perkListCopy.splice(index, 1);
      }
    }

    setRandomPerks(perksToUse);
  };

  const perkClicked = (slotNumber: number) => {
    const newLockedPerks = [...lockedPerks];
    newLockedPerks[slotNumber] = !newLockedPerks[slotNumber];
    setLockedPerks(newLockedPerks);

    return (event: React.MouseEvent) => {
      event.preventDefault;
    };
  };

  const handleKSToggle = (selection: IKSToggleSelectionType) => {
    setBuildType(selection.str);
    setRandomPerks(["", "", "", ""]);
    setLockedPerks([false, false, false, false]);
  };

  return (
    <div className="grid h-full place-items-center">
      <div className="max-w-2xl">
        <h1 className="text-center text-gray-200">Randomizer</h1>
        <div className="grid grid-cols-4 gap-5 mt-5 ml-5 mr-5">
          <div>
            <PerkSlot
              perkImage={randomPerks[0]}
              key={0}
              slotNumber={0}
              isSelected={lockedPerks[0]}
              handleClick={perkClicked}
            />
          </div>
          <div>
            <PerkSlot
              perkImage={randomPerks[1]}
              key={1}
              slotNumber={1}
              isSelected={lockedPerks[1]}
              handleClick={perkClicked}
            />
          </div>
          <div>
            <PerkSlot
              perkImage={randomPerks[2]}
              key={2}
              slotNumber={2}
              isSelected={lockedPerks[2]}
              handleClick={perkClicked}
            />
          </div>
          <div>
            <PerkSlot
              perkImage={randomPerks[3]}
              key={3}
              slotNumber={3}
              isSelected={lockedPerks[3]}
              handleClick={perkClicked}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 pl-5 pr-5 gap-5 place-content-center">
          <div>
            <button
              className="button1 mt-10 w-full object-contain"
              onClick={() => {
                getPerks();
              }}
            >
              Randomize
            </button>
          </div>
          <div>
            <Link
              to={
                "/createnew?perk0=" +
                randomPerks[0] +
                "&perk1=" +
                randomPerks[1] +
                "&perk2=" +
                randomPerks[2] +
                "&perk3=" +
                randomPerks[3] +
                "&buildType=" +
                buildType
              }
            >
              <button className="button1 mt-10 w-full object-contain">
                Save to new build
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <KSToggle onClick={handleKSToggle} />
        </div>
        <div className="flex justify-center mt-20 text-gray-400">
          <p>
            Tip: You can press a perk to "Lock it in" and then press "Randomize"
            again to reroll the other perks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Randomizer;
