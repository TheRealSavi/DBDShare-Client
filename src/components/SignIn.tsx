import { useContext } from "react";
import { UserContext } from "./UserContext";
import { FcGoogle } from "react-icons/fc";
import { BsSteam } from "react-icons/bs";
import { apiUrl } from "../apiConfig";

const SignIn = () => {
  const { userDetails } = useContext(UserContext);
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

  return (
    <div className="p-2 relative bg-slate-700 rounded-xl shadow-lg pb-1">
      <div>
        <p className="text-gray-200 text-xl mb-3 ml-3 mr-3">
          Sign in through a provider:
        </p>
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
      </div>
    </div>
  );
};

export default SignIn;
