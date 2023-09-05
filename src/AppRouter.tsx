import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Saved from "./pages/Saved";
import CreateNew from "./pages/CreateNew";
import Profile from "./pages/Profile";
import Randomizer from "./pages/Randomizer";
import AuthorPage from "./pages/AuthorPage";
import GenCalcPage from "./pages/GenCalcPage";
import PerkInfoPage from "./pages/PerkInfoPage";
import { useContext } from "react";
import { UserContext } from "./components/UserContext";
import { IUser } from "./types/types";

function AppRouter() {
  const userDetails = useContext(UserContext) as IUser;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {userDetails._id ? (
        <Route
          path="/profile"
          element={<AuthorPage authorID={userDetails._id} />}
        />
      ) : (
        <Route path="/profile" element={<Profile />} />
      )}

      <Route path="/callback" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/createnew" element={<CreateNew />} />
      <Route path="/randomizer" element={<Randomizer />} />
      <Route path="/author/:id" element={<AuthorPage />} />
      <Route path="/perk/:id" element={<PerkInfoPage />} />
      <Route path="/calc/gen" element={<GenCalcPage />} />
    </Routes>
  );
}

export default AppRouter;
