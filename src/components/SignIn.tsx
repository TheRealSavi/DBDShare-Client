import { useContext } from "react";
import axios from "axios";
import { IUser } from "../types/types";
import { UserContext } from "./UserContext";
import { FcGoogle } from "react-icons/fc";
import { BsSteam } from "react-icons/bs";

const SignIn = () => {
  const userDetails = useContext(UserContext) as IUser;
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
    window.open("api.gibbonsiv.com:5000/" + "auth/google", "_self");
  };

  const steamLogin = () => {
    window.open("api.gibbonsiv.com:5000/" + "auth/steam", "_self");
  };

  const logout = () => {
    axios
      .get("api.gibbonsiv.com:5000/" + "auth/logout", {
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

  return (
    <div className="p-2 relative bg-slate-700 rounded-xl shadow-lg w-fit pb-1">
      {userDetails._id ? (
        <div className="grid place-items-center pt-3 pb-3">
          <button className="button1 object-contain" onClick={logout}>
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
