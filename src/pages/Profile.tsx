import SignIn from "../components/SignIn";

const Profile = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="">
          <SignIn />
        </div>
        <div className="flex justify-center mt-8 text-white bg-gradient-to-r from-cyan-900 to-blue-900 rounded-xl shadow-lg ml-3 mr-3 mb-2">
          <div className="grid grid-cols-1">
            <p className="text-sm md:text-lg p-4 text-center">
              Thank you for your interest in the DBD Share Project!
            </p>
            <p className="p-4">
              Creating an account is not neccasary, but will grant these
              features:
            </p>
            <p className="pl-4 pr-4">* Post your own builds</p>
            <p className="pl-4 pr-4">* Save others builds</p>
            <p className="pl-4 pr-4">
              * Follow others to see their latest builds
            </p>
            <p className="pl-4 pr-4">
              * Get an early supporters badge on your profile when the site
              leaves early access!
            </p>
            <p className="text-gray-400 text-sm md:text-lg p-4">
              Creating an account does not store any of your personal
              information. Only your name and profile picture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
