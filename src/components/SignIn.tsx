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
    window.open(import.meta.env.VITE_API_URL + "auth/google", "_self");
  };

  const steamLogin = () => {
    window.open(import.meta.env.VITE_API_URL + "auth/steam", "_self");
  };

  const logout = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          localStorage.clear();
          window.location.href = "/profile";
        }
      });
  };

  return (
    <div className="p-2 relative bg-slate-700 rounded-xl shadow-lg w-fit pb-1">
      {userDetails._id ? (
        <div className="flex items-center p-1 mb-2">
          {userDetails.profilePic && (
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={userDetails.profilePic}
              loading="lazy"
            />
          )}
          <p className="text-gray-100 text-xl mb-1 ml-3">
            Welcome back, {userDetails.username}!
          </p>
        </div>
      ) : (
        <p className="text-gray-200 text-xl mb-3 ml-3 mr-3">
          Sign in through a provider:
        </p>
      )}

      {userDetails._id ? (
        <div></div>
      ) : (
        <div className="flex items-center justify-center mb-2">
          <div className=" bg-slate-600 p-5 pb-7 grid grid-cols-2 place-items-center gap-16 rounded-xl shadow-lg">
            <div className="text-center text-gray-200">
              <button className="button1 object-contain" onClick={googleLogin}>
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
      )}

      {userDetails._id ? (
        <div className="grid place-items-center pt-3 pb-3">
          <button className="button1 object-contain" onClick={logout}>
            Log out
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SignIn;
