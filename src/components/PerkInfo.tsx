import { IPerk } from "../types/types";

interface IPerkInfo {
  perkData?: IPerk;
}

const PerkInfo = (props: IPerkInfo) => {
  return (
    <div className="rounded-xl w-fit p-1 max-w-md">
      <div className="flex place-content-center">
        <div className="flex place-content-center flex-col w-fit">
          <p className="text-white text-xl pl-4">{props.perkData?.name}</p>
          <p className="text-gray-300 text-left pl-4 text-md">
            {props.perkData?.role + " : " + props.perkData?.owner}
          </p>
          <div className="flex flex-col text-left bg-gray-600 p-5 rounded-xl w-fit mt-2 shadow-lg">
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
      <div className="flex flex-wrap" key={i}>
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
