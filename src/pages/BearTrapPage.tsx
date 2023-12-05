import * as React from "react";
import { useEffect, useState } from "react";

const BearTrapPage = () => {
  const [bearTraps, setBearTraps] = useState(0);
  const [searches, setSearches] = useState(0);
  const [searchPool, setSearchPool] = useState(0);
  const [trapComponents, setTrapComponents] = useState<JSX.Element[]>([]);
  const [activeTraps, setActiveTraps] = useState(0);
  const [possibleAddons, setPossibleAddons] = useState<string[]>([]);
  const [inactiveTrapMax, setInactiveTrapMax] = useState<number[]>([]);
  const [completeTraps, setCompleteTraps] = useState(0);

  const determineAddons = () => {
    if (bearTraps == 2) {
      setPossibleAddons(["Amandas Letter (-2)"]);
    }
    if (bearTraps == 3) {
      setPossibleAddons([
        "Amandas Letter (-2)",
        "Jigsaws Annotated Plan /OR/ Jigsaws Sketch (+1)",
      ]);
    }
    if (bearTraps == 4) {
      setPossibleAddons(["Default, so none"]);
    }
    if (bearTraps == 5) {
      setPossibleAddons(["Jigsaws Annotated Plan /OR/ Jigsaws Sketch (+1)"]);
    }
    if (bearTraps == 6) {
      setPossibleAddons(["Jigsaws Annotated Plan (+1)", "Jigsaws Sketch (+1)"]);
    }
    if (bearTraps >= 7) {
      setPossibleAddons(["Impossible, Hacker"]);
    }
  };

  const calculateMinMax = () => {
    let remaining = 6 * 3 - searches;
    const groups = [];

    for (let i = 0; i < 6 - completeTraps; i++) {
      groups.push(1);
      remaining--;
    }

    let currentIndex = 0;
    while (remaining > 0) {
      groups[currentIndex]++;
      remaining--;
      currentIndex = (currentIndex + 1) % (6 - completeTraps);
    }
    return groups;
  };

  const handleSearch = () => {
    setSearches((prev) => prev + 1);
    setSearchPool((prev) => prev - 1);
  };

  const handleTrapComplete = () => {
    setActiveTraps((prev) => prev - 1);
    setCompleteTraps((prev) => prev + 1);
  };

  const handleReset = () => {
    setBearTraps(0);
    setSearches(0);
    setSearchPool(0);
    setTrapComponents([]);
    setActiveTraps(0);
    setPossibleAddons([]);
    setInactiveTrapMax([]);
    setCompleteTraps(0);
  };

  useEffect(() => {
    if (searchPool < 0 && activeTraps <= 1) {
      if (bearTraps < 6) {
        handleAddTrap(1);
      }
    }
    if (searchPool > 0 && activeTraps == 0) {
      if (bearTraps < 6) {
        handleAddTrap(1);
      }
    }
    if (activeTraps * 4 < searchPool) {
      if (bearTraps < 6) {
        handleAddTrap(1);
      }
    }
    determineAddons();
    setInactiveTrapMax(calculateMinMax());
  }, [searchPool, activeTraps]);

  const handleAddTrap = (x: number) => {
    setBearTraps(bearTraps + 1 * x);
    setSearchPool(searchPool + 3 * x);
    setActiveTraps(activeTraps + 1 * x);

    const newTraps = [] as JSX.Element[];

    for (let i = 1; i < x + 1; i++) {
      newTraps.push(
        <Trap
          key={trapComponents.length + i}
          onSearch={handleSearch}
          onComplete={handleTrapComplete}
          id={trapComponents.length + i}
        ></Trap>
      );
    }
    setTrapComponents([...trapComponents, ...newTraps]);
  };

  const handleAddClicked = () => {
    if (bearTraps == 0) {
      handleAddTrap(2);
    } else {
      if (bearTraps < 6) {
        handleAddTrap(1);
      }
    }
  };

  return (
    <div className="pt-2">
      <div className="flex items-start gap-2 p-2">
        <div className="p-2 bg-slate-600 w-fit rounded-md shadow-md">
          <div className="flex place-content-center">
            <button className="button1" onClick={handleAddClicked}>
              {bearTraps == 0 ? "Add a trap (2x)" : "Add a trap"}
            </button>
          </div>

          <p className="text-gray-300 pt-2">Traps: {bearTraps}</p>
          <p className="text-gray-300">Total Search Pool: {bearTraps * 3}</p>
          <p className="text-gray-300">Active Traps: {activeTraps}</p>
          <p className="text-gray-300">Total Searches: {searches}</p>
          <p className="text-gray-300">Incomplete Mins: {inactiveTrapMax}</p>
          <p className="text-white pt-4">Remaining Search Pool: {searchPool}</p>
        </div>

        <div className="p-2 bg-slate-600 w-fit rounded-md shadow-md">
          <p className="text-white text-sm">Possible Addons</p>
          {possibleAddons.map((addon, i) => (
            <p className="text-white text-xs" key={i}>
              {addon}
            </p>
          ))}
        </div>
        <div className="p-2 bg-slate-600 w-fit rounded-md shadow-md ml-auto">
          <button className="button1" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-4 place-content-center flex-wrap">
        {trapComponents.map((trapComponent) => (
          <div key={trapComponents.indexOf(trapComponent)}>{trapComponent}</div>
        ))}
      </div>
    </div>
  );
};

interface ITrap {
  onSearch: () => void;
  onComplete: () => void;
  id: number;
  min?: number;
  max?: number;
}

const Trap = (props: ITrap) => {
  const [searches, setSearches] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSearch = () => {
    props.onSearch();
    setSearches(searches + 1);
  };

  const handleComplete = () => {
    props.onComplete();
    setCompleted(true);
  };

  useEffect(() => {
    if (searches == 4) {
      handleComplete();
    }
  }, [searches]);

  return (
    <div className="p-2 bg-slate-600 w-fit rounded-md shadow-md flex flex-col gap-2">
      <p className="text-white text-sm">Trap {props.id}</p>
      {completed && <p className="text-green-400 text-md">Completed</p>}
      {!completed && (
        <button className="button1" onClick={handleSearch}>
          Add a search
        </button>
      )}
      <p className="text-white">Searches: {searches} / 4</p>
      <div className="flex justify-between">
        <p className="text-gray-300 text-xs">Min: {props.min}</p>
        <p className="text-gray-300 text-xs">Max: {props.min}</p>
      </div>

      {!completed && searches > 0 && (
        <button className="button2" onClick={handleComplete}>
          Complete
        </button>
      )}
    </div>
  );
};

export default BearTrapPage;
