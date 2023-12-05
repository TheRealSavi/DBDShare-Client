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
import Devpage from "./pages/DevPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import BearTrapPage from "./pages/BearTrapPage";

function AppRouter() {
  const { userDetails } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {userDetails?._id ? (
        <Route
          path="/profile"
          element={<AuthorPage authorID={userDetails._id} />}
        />
      ) : (
        <Route path="/profile" element={<Profile />} />
      )}
      <Route path="/devpage" element={<Devpage />}></Route>
      <Route path="/callback" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/createnew" element={<CreateNew />} />
      <Route path="/randomizer" element={<Randomizer />} />
      <Route path="/author/:id" element={<AuthorPage />} />
      <Route path="/perk/:id" element={<PerkInfoPage />} />
      <Route path="/calc" element={<CalculatorsPage />} />
      <Route path="/calc/gen" element={<GenCalcPage />} />
      <Route path="/calc/rbt" element={<BearTrapPage />} />
    </Routes>
  );
}

export default AppRouter;
