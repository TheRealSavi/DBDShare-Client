import survivorImg from "../assets/survivor.png";
import killerImg from "../assets/killer.png";
import { useState } from "react";
import { IKSToggleSelectionType } from "../types/types";

const Selections = {
  surivor: { str: "survivor", img: survivorImg } as IKSToggleSelectionType,
  killer: { str: "killer", img: killerImg } as IKSToggleSelectionType,
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
    if (props.start != selection.str) {
      setSelection(toggleSelection());
    }
  }

  return (
    <img
      src={selection.img}
      className="h-10 hover:h-11"
      onClick={handleClick}
    ></img>
  );
};

export default KSToggle;
