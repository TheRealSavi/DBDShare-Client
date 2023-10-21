import { useContext, useEffect, useState } from "react";
import veryrare from "../assets/very-rare.png";
import selected from "../assets/selected.png";
import emptySlot from "../assets/blank.png";
import axios from "axios";
import { IPerkSlot } from "../types/types";
import { Popover, Spin } from "antd";
import PerkInfo from "./PerkInfo";
import { apiUrl } from "../apiConfig";
import { UserContext } from "./UserContext";

const PerkSlot = (props: IPerkSlot) => {
  const [perkData, setPerkData] = useState(props.perk);
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useContext(UserContext);
  const [skin, setSkin] = useState(
    userDetails?.settings?.perkSkin || "default"
  );

  useEffect(() => {
    if (perkData?._id && !perkData.imgUrl) {
      // Fetch the missing data from the database
      fetchPerkData(perkData._id).then((data) => {
        setPerkData({ ...perkData, ...data });
      });
    }
  }, [perkData]);

  useEffect(() => {
    setSkin(userDetails?.settings?.perkSkin || "default");
  }, [userDetails]);

  useEffect(() => {
    setPerkData(props.perk);
  }, [props.perk]);

  const fetchPerkData = async (perkId: string) => {
    setIsLoading(true);
    try {
      // Make an API call to fetch the missing perk data using the perk._id or any identifier
      const response = await axios.get(apiUrl + "perk/" + perkId);
      setIsLoading(false);
      const data = response.data;
      return data;
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching perk data:", error);
      const data = { imgUrl: emptySlot };
      return data;
    }
  };

  return (
    <Spin spinning={isLoading}>
      <Popover content={perkData && <PerkInfo perkData={perkData}></PerkInfo>}>
        <div
          className="relative w-full h-28 group"
          onClick={() => {
            if (props.handleClick) {
              props.handleClick(props.slotNumber);
            }
          }}
        >
          <img
            className="h-full w-full object-contain drop-shadow-md"
            src={perkData?.imgUrl ? veryrare : emptySlot}
            alt={perkData?.name ? perkData.name : "Empty Slot"}
          />
          {perkData?.imgUrl && (
            <div className="flex justify-center text-white">
              <img
                className="absolute top-0 left-0 w-full h-full object-contain"
                src={apiUrl + "perkimg/" + perkData.imgUrl + "?skin=" + skin}
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
        </div>
      </Popover>
    </Spin>
  );
};

export default PerkSlot;
