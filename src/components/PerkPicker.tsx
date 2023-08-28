import { useEffect, useState } from "react";
import { IPerk } from "../types/types";
import PerkSlot from "./PerkSlot";
import axios from "axios";

interface PerkPickerProps {
  selectedPerks: (IPerk | undefined)[];
  perkType: string;
  handlePerkSelect: (perk: IPerk) => void;
}

const PerkPicker = (props: PerkPickerProps) => {
  const [perkList, setPerkList] = useState<IPerk[]>([]);

  useEffect(() => {
    const getPerks = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "perks"
        );
        setPerkList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPerks();
  }, []);

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
          <div className="p-2 grid gap-2 grid-cols-4 sm:grid-cols-5">
            {perkList.map((perk, i) => {
              return (
                <PerkSlot
                  perk={perk}
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

export default PerkPicker;
