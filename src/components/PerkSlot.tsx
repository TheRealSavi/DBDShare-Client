import { useEffect, useState } from "react";
import veryrare from "../assets/very-rare.png";
import selected from "../assets/selected.png";
import emptySlot from "../assets/blank.png";
import axios from "axios";
import { IPerkSlot } from "../types/types";

const PerkSlot = (props: IPerkSlot) => {
  const [perkData, setPerkData] = useState(props.perk);

  useEffect(() => {
    if (props.perk && !props.perk.imgUrl) {
      // Fetch the missing data from the database
      fetchPerkData(props.perk._id).then((data) => {
        setPerkData({ ...perkData, ...data });
      });
    }
  }, [props.perk]);

  useEffect(() => {
    setPerkData(props.perk);
  }, [props.perk]);

  const fetchPerkData = async (perkId: string) => {
    try {
      // Make an API call to fetch the missing perk data using the perk._id or any identifier
      const response = await axios.get(`http://localhost:5000/perk/${perkId}`);
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
        src={perkData ? veryrare : emptySlot}
        alt={perkData ? perkData.name : "Empty Slot"}
      />
      {perkData && (
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={`http://localhost:5000/perkimg/${perkData.imgUrl}`}
          alt={perkData.name}
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
