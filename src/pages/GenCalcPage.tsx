import { Watermark } from "antd";
import genImg from "../assets/gen.png";
import PerkPicker from "../components/PerkPicker";
import { RoleENUM } from "../types/types";

const GenCalcPage = () => {
  return (
    <Watermark content="Work In Progress">
      <div className="pt-4">
        <div className="flex gap-4 ">
          <div className="flex justify-center gap-8">
            <div className=" bg-gray-600 rounded-xl min-w-fit shadow-xl flex text-white text-center p-2">
              <img className="h-52 w-52 " src={genImg}></img>
              <div className="">Time to complete:</div>
            </div>
          </div>

          <div className="flex h-fit gap-4">
            <div className=" bg-gray-600 rounded-xl w-fit shadow-xl flex text-white p-2">
              Positive Mult
            </div>

            <div className=" bg-gray-600 rounded-xl w-fit shadow-xl flex text-white p-2">
              Negative Mult
            </div>

            <div className=" bg-gray-600 rounded-xl w-fit shadow-xl flex text-white p-2">
              Efficiency Mult
            </div>
          </div>
        </div>
        <div className="p-2 mt-4 gap-4 flex w-fit h-fit flex-col bg-gray-600 shadow-xl rounded-xl">
          <div className="text-white bg-gray-400 rounded-md shadow-md">
            Add a survivor
          </div>
          <div className="text-white bg-gray-400 rounded-md shadow-md">
            Survivor1
          </div>
          <div className="text-white bg-gray-400 rounded-md shadow-md">
            Survivor2
          </div>
          <div className="text-white bg-gray-400 rounded-md shadow-md">
            Survivor3
          </div>
          <div className="text-white bg-gray-400 rounded-md shadow-md">
            Survivor4
          </div>
        </div>
        <div className="text-white bg-gray-600 fixed bottom-2 right-2 rounded-md ">
          <PerkPicker
            selectedPerks={[]}
            role={RoleENUM.Survivor}
            handlePerkSelect={function (): void {
              throw new Error("Function not implemented.");
            }}
          ></PerkPicker>
        </div>
      </div>
    </Watermark>
  );
};

export default GenCalcPage;
