import veryrare from "../assets/very-rare.png";
import selected from "../assets/selected.png";
import emptySlot from "../assets/blank.png";

import { MouseEventHandler } from "react";

interface IPerkSlot {
  perkImage: string;
  key: number;
  slotNumber: number;
  isSelected: boolean;
  handleClick?: (slotNumber: number) => MouseEventHandler;
}

const PerkSlot = (props: IPerkSlot) => {
  let isPopulated = false;

  if (props.perkImage != "" && props.perkImage != undefined) {
    isPopulated = true;
  }

  return (
    <div
      className={"relative w-full h-28"}
      onClick={() => {
        if (props.handleClick) {
          props.handleClick(props.slotNumber);
        }
      }}
    >
      <img
        className="h-full w-full object-contain"
        src={isPopulated ? veryrare : emptySlot}
      />
      {props.perkImage && (
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={props.perkImage}
        />
      )}
      {props.isSelected && (
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={selected}
        />
      )}
    </div>
  );
};

export default PerkSlot;
