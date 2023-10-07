import SignIn from "../components/SignIn";

const Profile = () => {
  return (
    <div className="">
      <h1 className="text-center text-gray-200 pt-2">Profile</h1>
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Profile;
