import { useContext } from "react";
import axios from "axios";
import { IUser } from "../types/types";
import { UserContext } from "./UserContext";

const SignIn = () => {
  const userDetails = useContext(UserContext) as IUser;
  console.log(userDetails);

  const signInProvider = () => {
    if (userDetails.steamId) {
      return "Steam";
    }
    if (userDetails.googleId) {
      return "Google";
    }
    return "Unknown";
  };

  const googleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const steamLogin = () => {
    window.open("http://localhost:5000/auth/steam", "_self");
  };

  const logout = () => {
    axios
      .get("http://localhost:5000/auth/logout", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          localStorage.clear();
          window.location.href = "/profile";
        }
      });
  };

  return (
    <div className="p-2 relative w-full bg-gray-600 rounded-xl shadow-lg">
      <div className="text-center">
        {userDetails._id ? (
          <p className="text-green-400">
            Signed in as {userDetails.username} through {signInProvider()}
          </p>
        ) : (
          <p className="text-red-500 text-xl mb-2">Not signed in</p>
        )}
      </div>
      <div className="grid place-items-center">
        <div className="w-1/2 bg-gray-700 p-5 grid place-items-center gap-6 rounded-xl shadow-lg">
          <div className="text-center text-gray-200">
            <button className="button1 object-contain" onClick={googleLogin}>
              Sign in with Google
            </button>
          </div>
          <div>
            <button className="button1 object-contain" onClick={steamLogin}>
              Sign in with Steam{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pb-5 text-center text-red-600">
        <button className="button1 object-contain" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SignIn;
