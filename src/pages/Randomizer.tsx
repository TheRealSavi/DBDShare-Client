import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PerkSlot from "../components/PerkSlot";
import KSToggle from "../components/KSToggle";
import { IKSToggleSelectionType, IPerk } from "../types/types";
import axios from "axios";

const Randomizer = () => {
  const [randomPerks, setRandomPerks] = useState<IPerk[]>();
  const [lockedPerks, setLockedPerks] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [buildType, setBuildType] = useState("survivor");
  const [perkList, setPerkList] = useState<IPerk[]>();

  useEffect(() => {
    const getPerks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/perks");
        setPerkList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPerks();
  }, []);

  const genRandomPerks = () => {
    const perksToUse = [];

    for (let i = 0; i < lockedPerks.length; i++) {
      if (
        lockedPerks[i] === true &&
        randomPerks != undefined &&
        randomPerks[i] != undefined &&
        perkList != undefined
      ) {
        perksToUse[i] = randomPerks[i];
        const index = perkList.indexOf(randomPerks[i]);
        if (index > -1) {
          perkList.splice(index, 1);
        }
      }
    }

    if (perkList != undefined) {
      for (let i = 0; i < 4; i++) {
        const toAdd = perkList[Math.floor(Math.random() * perkList.length)];
        if (lockedPerks[i] === false) {
          perksToUse[i] = toAdd;
        }
        const index = perkList.indexOf(toAdd);
        if (index > -1) {
          perkList.splice(index, 1);
        }
      }
      setRandomPerks(perksToUse);
    }
  };

  const perkClicked = (slotNumber: number) => {
    if (randomPerks != undefined) {
      const newLockedPerks = [...lockedPerks];
      newLockedPerks[slotNumber] = !newLockedPerks[slotNumber];
      setLockedPerks(newLockedPerks);
    }

    return (event: React.MouseEvent) => {
      event.preventDefault;
    };
  };

  const handleKSToggle = (selection: IKSToggleSelectionType) => {
    setBuildType(selection.str);
    setRandomPerks([]);
    setLockedPerks([false, false, false, false]);
  };

  return (
    <div className="grid h-full place-items-center">
      <div className="max-w-2xl">
        <h1 className="text-center text-gray-200 mt-2">Perk Randomizer</h1>
        <div className="bg-gray-700 rounded-xl shadow-lg p-2 mt-4 m-2 ml-4">
          <div className="grid grid-cols-4 gap-2 md:gap-5 mt-5 md:ml-5 md:mr-5">
            <div>
              <PerkSlot
                perk={randomPerks ? randomPerks[0] : undefined}
                key={0}
                slotNumber={0}
                isSelected={lockedPerks[0]}
                handleClick={perkClicked}
              />
            </div>
            <div>
              <PerkSlot
                perk={randomPerks ? randomPerks[1] : undefined}
                key={1}
                slotNumber={1}
                isSelected={lockedPerks[1]}
                handleClick={perkClicked}
              />
            </div>
            <div>
              <PerkSlot
                perk={randomPerks ? randomPerks[2] : undefined}
                key={2}
                slotNumber={2}
                isSelected={lockedPerks[2]}
                handleClick={perkClicked}
              />
            </div>
            <div>
              <PerkSlot
                perk={randomPerks ? randomPerks[3] : undefined}
                key={3}
                slotNumber={3}
                isSelected={lockedPerks[3]}
                handleClick={perkClicked}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 pl-1 pr-1 md:pl-5 md:pr-5 gap-5 place-content-center">
            <div>
              <button
                className="button1 mt-10 w-full object-contain"
                onClick={() => {
                  genRandomPerks();
                }}
              >
                Randomize
              </button>
            </div>
            <div>
              {randomPerks ? (
                <Link
                  to={
                    "/createnew?perk0=" +
                    randomPerks[0]._id +
                    "&perk1=" +
                    randomPerks[1]._id +
                    "&perk2=" +
                    randomPerks[2]._id +
                    "&perk3=" +
                    randomPerks[3]._id +
                    "&buildType=" +
                    buildType
                  }
                >
                  <button className="button1 mt-10 w-full object-contain">
                    Save to new build
                  </button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 place-items-center mt-11">
            <div className="absolute">
              <KSToggle onClick={handleKSToggle} />
            </div>
          </div>
          <div className="flex justify-center mt-14 text-gray-400 bg-gray-800 rounded-xl shadow-lg ml-3 mr-3 mb-2">
            <div className="grid grid-cols-1">
              <p className="text-sm md:text-lg p-4">
                Tip: You can press a perk to "Lock it in" and then press
                "Randomize" again to reroll the other perks.
              </p>
              <p className="text-sm md:text-lg mt-1 p-4">
                This is useful in the scenario where you dont have a perk, you
                can lock in all the other perks, press randomize again, and
                reroll for just the perk that you dont have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Randomizer;
