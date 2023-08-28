import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Saved from "./pages/Saved";
import CreateNew from "./pages/CreateNew";
import Profile from "./pages/Profile";
import Randomizer from "./pages/Randomizer";
import AuthorPage from "./pages/AuthorPage";
import GenCalcPage from "./pages/GenCalcPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/callback" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/createnew" element={<CreateNew />} />
      <Route path="/randomizer" element={<Randomizer />} />
      <Route path="/author/:id" element={<AuthorPage />} />
      <Route path="/calc/gen" element={<GenCalcPage />} />
    </Routes>
  );
}

export default AppRouter;
