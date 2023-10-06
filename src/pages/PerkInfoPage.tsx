import { useMatch } from "react-router-dom";
import { IPerk } from "../types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import PerkInfo from "../components/PerkInfo";
import PerkSlot from "../components/PerkSlot";

const PerkInfoPage = () => {
  const match = useMatch("/perk/:id");
  const { id } = match?.params ?? {};
  const [perkData, setPerkData] = useState<IPerk>();

  const fetchPerkData = async (perkId: string) => {
    try {
      // Make an API call to fetch the missing perk data using the perk._id or any identifier
      const response = await axios.get(
        "api.gibbonsiv.com:5000/" + "perk/" + perkId
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching perk data:", error);
    }
  };

  useEffect(() => {
    fetchPerkData(id ? id : "").then((data) => {
      setPerkData({ ...data });
    });
  }, [id]);

  return (
    <div className="flex place-content-center pt-5 flex-col">
      <PerkSlot
        perk={perkData}
        key={0}
        slotNumber={0}
        isSelected={false}
        allowHover={false}
      ></PerkSlot>
      <div className="flex place-content-center">
        <PerkInfo perkData={perkData} />
      </div>
    </div>
  );
};

export default PerkInfoPage;
