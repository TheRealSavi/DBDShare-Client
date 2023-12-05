import { Link } from "react-router-dom";
import genImg from "../assets/gen.png";
import rbtImg from "../assets/IconPowers_jigsawsBaptism.png";

const CalculatorsPage = () => {
  return (
    <div className="pt-2">
      <div className="flex gap-2 p-1 flex-wrap place-content-center">
        <Option label="Gen calculator" img={genImg} to="/calc/gen" />
        <Option label="RBT Tracker" img={rbtImg} to="/calc/rbt" />
      </div>
    </div>
  );
};

interface IOption {
  label: string;
  img: string;
  to: string;
}

const Option = (props: IOption) => {
  return (
    <Link to={props.to}>
      <div className="bg-gradient-to-br from-slate-600 hover:from-slate-500 to-gray-700 hover:to-gray-600 w-56 hover:w-60 hover:ml-3 hover:mr-3 h-fit text-base hover:text-lg  rounded-lg shadow-lg transition-all duration-200 ease-linear">
        <div className="flex flex-col place-content-center place-items-center p-2">
          <img className="object-contain w-44 h-44" src={props.img}></img>
          <p className="text-center text-white p-1">{props.label}</p>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorsPage;
