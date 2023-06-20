import survivorImg from "../assets/survivor.png";
import killerImg from "../assets/killer.png";
import { useState } from "react";
import { IKSToggleSelectionType } from "../types/types";

const Selection = {
  surivor: { str: "survivor", img: survivorImg },
  killer: { str: "killer", img: killerImg },
};

interface IKSToggleProps {
  start?: string;
  onClick: (selection: IKSToggleSelectionType) => void;
}

const KSToggle = (props: IKSToggleProps) => {
  const [selection, setSelection] = useState(Selection.surivor);

  const handleClick = () => {
    props.onClick(toggleSelection());
  };

  const toggleSelection = () => {
    if (selection == Selection.surivor) {
      setSelection(Selection.killer);
      return Selection.killer;
    } else {
      setSelection(Selection.surivor);
      return Selection.surivor;
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
