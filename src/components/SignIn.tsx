import { useContext } from "react";
import axios from "axios";
import { IUserSettings } from "../types/types";
import { UserContext } from "./UserContext";
import { FcGoogle } from "react-icons/fc";
import { BsSteam } from "react-icons/bs";
import { apiUrl } from "../apiConfig";
import { Select } from "antd";

const SignIn = () => {
  const { userDetails, reloadUser } = useContext(UserContext);
  console.log(userDetails);

  // const signInProvider = () => {
  //   if (userDetails.steamId) {
  //     return "Steam";
  //   }
  //   if (userDetails.googleId) {
  //     return "Google";
  //   }
  //   return "Unknown";
  // };

  const googleLogin = () => {
    window.open(apiUrl + "auth/google", "_self");
  };

  const steamLogin = () => {
    window.open(apiUrl + "auth/steam", "_self");
  };

  const logout = () => {
    axios
      .get(apiUrl + "auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          localStorage.clear();
          window.location.href = "/home";
        }
      });
  };

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
    <div className="p-2 relative bg-slate-700 rounded-xl shadow-lg pb-1">
      {userDetails?._id ? (
        <div className="grid place-items-center pt-3 pb-3">
          <p className="place-self-start text-base text-gray-200">Perk Skin:</p>
          <Select
            className="w-56 place-self-start"
            defaultValue={userDetails.settings?.perkSkin}
            options={[
              { value: "galaxy", label: "Galaxy" },
              { value: "bunnyPink", label: "Pink Bunny" },
              { value: "bunnyGreen", label: "Green Bunny" },
              { value: "default", label: "Default" },
            ]}
            onChange={handleSelectSkin}
          />

          <button className="button1 object-contain mt-6" onClick={logout}>
            Log out
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-200 text-xl mb-3 ml-3 mr-3">
            Sign in through a provider:
          </p>
          <div className="flex items-center justify-center mb-2">
            <div className=" bg-slate-600 p-5 pb-7 grid grid-cols-2 place-items-center gap-16 rounded-xl shadow-lg">
              <div className="text-center text-gray-200">
                <button
                  className="button1 object-contain"
                  onClick={googleLogin}
                >
                  {<FcGoogle size={50} />}
                </button>
              </div>
              <div>
                <button className="button1 object-contain" onClick={steamLogin}>
                  <BsSteam size={50} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
