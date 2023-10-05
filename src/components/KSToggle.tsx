import survivorImg from "../assets/survivor.png";
import killerImg from "../assets/killer.png";
import { useState } from "react";
import { IKSToggleSelectionType, RoleENUM } from "../types/types";

const Selections = {
  surivor: {
    role: RoleENUM.Survivor,
    img: survivorImg,
  } as IKSToggleSelectionType,
  killer: { role: RoleENUM.Killer, img: killerImg } as IKSToggleSelectionType,
};

interface IKSToggleProps {
  start?: string;
  onClick: (selection: IKSToggleSelectionType) => void;
}

const KSToggle = (props: IKSToggleProps) => {
  const [selection, setSelection] = useState(Selections.surivor);

  const handleClick = () => {
    props.onClick(toggleSelection());
  };

  const toggleSelection = () => {
    if (selection == Selections.surivor) {
      setSelection(Selections.killer);
      return Selections.killer;
    } else {
      setSelection(Selections.surivor);
      return Selections.surivor;
    }
  };

  if (props.start) {
    if (props.start != selection.role) {
      setSelection(toggleSelection());
    }
  }

  return (
    <div
      className="button1 flex place-items-center gap-2 text-white"
      onClick={handleClick}
    >
      <img src={selection.img} className="h-12"></img>
      <p>Change Role</p>
    </div>
  );
};

export default KSToggle;
