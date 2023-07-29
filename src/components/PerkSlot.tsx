import { useEffect, useState } from "react";
import veryrare from "../assets/very-rare.png";
import selected from "../assets/selected.png";
import emptySlot from "../assets/blank.png";
import axios from "axios";
import { IPerkSlot } from "../types/types";

const PerkSlot = (props: IPerkSlot) => {
  const [perkData, setPerkData] = useState(props.perk);

  useEffect(() => {
    if (perkData?._id && !perkData.imgUrl) {
      // Fetch the missing data from the database
      fetchPerkData(perkData._id).then((data) => {
        setPerkData({ ...perkData, ...data });
      });
    }
  }, [perkData]);

  useEffect(() => {
    setPerkData(props.perk);
  }, [props.perk]);

  const fetchPerkData = async (perkId: string) => {
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
      className="relative w-full h-28"
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
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={import.meta.env.VITE_API_URL + "perkimg/" + perkData.imgUrl}
          alt={perkData?.name ? perkData.name : "No name"}
          loading="lazy"
        />
      )}
      {props.isSelected && (
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={selected}
          alt="Selected"
        />
      )}
    </div>
  );
};

export default PerkSlot;
