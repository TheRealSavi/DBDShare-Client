import { useEffect, useState } from "react";
import veryrare from "../assets/very-rare.png";
import selected from "../assets/selected.png";
import emptySlot from "../assets/blank.png";
import axios from "axios";
import { IPerk, IPerkSlot } from "../types/types";
import Tooltip from "./Tooltip";
import PerkInfo from "./PerkInfo";

const PerkSlot = (props: IPerkSlot) => {
  const [perkData, setPerkData] = useState(props.perk);
  const [attemptedResolve, setAttemptedResolve] = useState(false);

  useEffect(() => {
    if (perkData?._id && !perkData.imgUrl && !attemptedResolve) {
      // Fetch the missing data from the database
      fetchPerkData(perkData._id).then((data) => {
        setPerkData({ ...perkData, ...data });
      });
    }
  }, [attemptedResolve, perkData]);

  useEffect(() => {
    setPerkData(props.perk);
    setAttemptedResolve(false);
  }, [props.perk]);

  const fetchPerkData = async (perkId: string) => {
    setAttemptedResolve(true);
    try {
      // Make an API call to fetch the missing perk data using the perk._id or any identifier
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "perk/" + perkId
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching perk data:", error);
    }
  };

  return (
    <div
      className="relative w-full h-28 group"
      onClick={() => {
        if (props.handleClick) {
          props.handleClick(props.slotNumber);
        }
      }}
    >
      <img
        className="h-full w-full object-contain"
        src={perkData?.imgUrl ? veryrare : emptySlot}
        alt={perkData?.name ? perkData.name : "Empty Slot"}
      />
      {perkData?.imgUrl && (
        <div className="flex justify-center">
          <img
            className="absolute top-0 left-0 w-full h-full object-contain"
            src={import.meta.env.VITE_API_URL + "perkimg/" + perkData.imgUrl}
            alt={perkData?.name ? perkData.name : "No name"}
            loading="lazy"
          />
        </div>
      )}
      {props.isSelected && (
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={selected}
          alt="Selected"
        />
      )}
      <div className="flex justify-center">
        {perkData?.imgUrl && props.allowHover && (
          <Tooltip requireHover={true}>
            {/* <p>{perkData?.name}</p> */}
            <PerkInfo perkData={perkData} />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default PerkSlot;
