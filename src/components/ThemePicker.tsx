import { Select } from "antd";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { apiUrl } from "../apiConfig";
import { IUserSettings } from "../types/types";

const ThemePicker = () => {
  const { userDetails, reloadUser } = useContext(UserContext);

  const handleSelectSkin = (value: string) => {
    const newSettings = { perkSkin: value } as IUserSettings;
    axios
      .post(apiUrl + "setUserSettings", newSettings, {
        withCredentials: true,
      })
      .then(() => {
        reloadUser();
      });
  };

  return (
    <div className="grid place-items-center pt-3 pb-3">
      <p className="place-self-start text-base text-gray-200">Perk Skin:</p>
      <Select
        className="w-56 place-self-start"
        defaultValue={userDetails?.settings?.perkSkin}
        options={[
          { value: "galaxy", label: "Galaxy" },
          { value: "bunnyPink", label: "Pink Bunny" },
          { value: "bunnyGreen", label: "Green Bunny" },
          { value: "default", label: "Default" },
        ]}
        onChange={handleSelectSkin}
      />
    </div>
  );
};

export default ThemePicker;
