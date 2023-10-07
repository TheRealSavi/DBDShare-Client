import { IPerk } from "../types/types";
import { apiUrl } from "../apiConfig";

interface IPerkInfo {
  perkData?: IPerk;
}

const PerkInfo = (props: IPerkInfo) => {
  return (
    <div className="rounded-xl w-fit p-2 max-w-xs md:max-w-sm bg-gradient-to-r from-cyan-900 to-blue-900 overflow-hidden drop-shadow-lg ring-2 ring-slate-100 ring-opacity-80">
      <div className="absolute top-3 right-3 w-16 h-16 md:w-24 md:h-24 opacity-20">
        {props.perkData?.imgUrl && (
          <img
            src={
              apiUrl + "perkimg/" + props.perkData.imgUrl
            }
          ></img>
        )}
      </div>
      <div className="flex place-content-center">
        <div className="flex place-content-center flex-col w-fit">
          <p className="text-white text-md md:text-lg pl-4 pt-2 font-bold">
            {props.perkData?.name}
          </p>
          <p className="text-gray-300 text-left pl-4 text-xs md:text-sm">
            {props.perkData?.role + " : " + props.perkData?.owner}
          </p>
          <div className="flex flex-col text-left bg-gray-600 p-3 md:p-5 rounded-xl w-fit mt-2 shadow-lg bg-opacity-60">
            <PerkDesc desc={props.perkData?.desc ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IPerkDesc {
  desc: string;
}

const PerkDesc = (props: IPerkDesc) => {
  const lines = props.desc.split("\r").map((line, i) => {
    return (
      <div className="flex flex-wrap text-xs md:text-sm" key={i}>
        {line.split(/(\d+)\/(\d+)\/(\d+)/).map((part, j) => (
          <div key={j}>
            {j % 4 == 1 ? <span className="text-white">&nbsp;</span> : <></>}
            <span
              className={
                j % 4 === 0
                  ? "text-white"
                  : j % 4 === 1
                  ? "text-yellow-400"
                  : j % 4 === 2
                  ? "text-green-400"
                  : "text-purple-400"
              }
              key={j}
            >
              {part}
            </span>
            {j % 4 == 1 || j % 4 == 2 ? (
              <span className="text-white">/</span>
            ) : (
              <></>
            )}
            {j % 4 == 3 ? <span className="text-white">&nbsp;</span> : <></>}
          </div>
        ))}
      </div>
    );
  });

  return <div>{lines}</div>;
};

export default PerkInfo;
