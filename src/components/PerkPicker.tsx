import { useEffect, useState } from "react";
import { IPerk, RoleENUM } from "../types/types";
import PerkSlot from "./PerkSlot";
import axios from "axios";

interface PerkPickerProps {
  selectedPerks: (IPerk | undefined)[];
  role: RoleENUM;
  handlePerkSelect: (perk: IPerk) => void;
}

const PerkPicker = (props: PerkPickerProps) => {
  const [masterPerkList, setMasterPerkList] = useState<IPerk[]>();
  const [perkList, setPerkList] = useState<IPerk[]>([]);

  useEffect(() => {
    const getPerks = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "perks"
        );

        setMasterPerkList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPerks();
  }, []);

  useEffect(() => {
    if (masterPerkList) {
      const copyPerkList = masterPerkList.filter(
        (perk: IPerk) => perk.role === props.role
      );
      setPerkList(copyPerkList);
    }
  }, [masterPerkList, props.role]);

  const perkPicked = (slotNumber: number) => {
    props.handlePerkSelect(perkList[slotNumber]);
    return (event: React.MouseEvent) => {
      event.preventDefault;
    };
  };

  return (
    <div className="h-full w-full">
      <div className="p-2 grid gap-2 grid-cols-4 sm:grid-cols-5">
        {perkList.map((perk, i) => {
          return (
            <PerkSlot
              perk={perk}
              key={i}
              slotNumber={i}
              isSelected={props.selectedPerks.includes(perk)}
              handleClick={perkPicked}
              allowHover={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PerkPicker;
