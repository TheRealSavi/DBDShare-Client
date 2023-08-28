import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillBookmarkHeartFill, BsFillCalculatorFill } from "react-icons/bs";
import { GiCardRandom } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { ReactNode } from "react";

interface ISideBarButton {
  to: string;
  icon: ReactNode;
  text: string;
}

const Navbar = () => {
  return (
    <div className="fixed z-50 top-0 h-screen w-20 m-0 flex flex-col bg-gray-800">
      <div className="fixed z-50 top-2 left-2 bottom-1 w-16 m-0 flex flex-col bg-gray-900 shadow-xl rounded-xl">
        <SideBarButton
          to="/profile"
          icon={<CgProfile size="28" />}
          text="Profile"
        />

        <hr className="navbar-hr" />

        <SideBarButton
          to="/home"
          icon={<AiOutlineHome size="28" />}
          text="Home"
        />

        <SideBarButton
          to="/saved"
          icon={<BsFillBookmarkHeartFill size="28" />}
          text="Saved"
        />

        <hr className="navbar-hr" />

        <SideBarButton
          to="/createnew"
          icon={<IoMdAdd size="28" />}
          text="Create New"
        />

        <hr className="navbar-hr" />
        <SideBarButton
          to="/randomizer"
          icon={<GiCardRandom size="28" />}
          text="Perk Randomizer"
        />
        <SideBarButton
          to="/calc/gen"
          icon={<BsFillCalculatorFill size="28" />}
          text="Calculators"
        />
      </div>
    </div>
  );
};

const SideBarButton = ({ to, icon, text }: ISideBarButton) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link to={to}>
      <div
        className={
          isActive
            ? "z-50 sidebar-icon group shadow-xl nav-active"
            : "z-50 sidebar-icon group shadow-xl"
        }
      >
        {icon}
        <span className="z-50 sidebar-tooltip md:group-hover:scale-100">
          {text}
        </span>
      </div>
    </Link>
  );
};

export default Navbar;
