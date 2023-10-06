import axios from "axios";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

interface FinalPerk extends Perk {
  imgUrl?: string;
}

interface Perk {
  name: string;
  desc: string;
  owner: string;
  role: string;
}

interface File {
  name: string;
  path: string;
}

interface FuseResult {
  perks: FinalPerk[];
  unused: File[];
}

function Devpage() {
  const [perkDefs, setPerkDefs] = useState<Perk[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [fuseResult, setFuseResult] = useState<FuseResult>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPerkDefs = async () => {
      try {
        const response = await axios.get(
          "api.gibbonsiv.com:5000/" + "perkDefs",
          { withCredentials: true }
        );
        setPerkDefs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getFiles = async () => {
      try {
        const response = await axios.get(
          "api.gibbonsiv.com:5000/" + "perkFileDirs",
          { withCredentials: true }
        );
        setFiles(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPerkDefs();
    getFiles();
  }, []);

  const fuseNames = (perks: Perk[], files: File[], t: number) => {
    const fileNames = Object.values(files).map((file) => file.name);

    const unusedFiles = [...files];

    const options = {
      includeScore: false, // Include similarity score in the result
      threshold: t, // Adjust this threshold as needed
    };

    const fuse = new Fuse(fileNames, options);

    // Find close matches for each string in the second array
    const matches = perks.map((perk) => {
      const finds = fuse.search(perk.name);
      if (finds.length > 0) {
        const matchedName = finds[0].item;
        const matchedFile = files.find((file) => file.name === matchedName);
        if (matchedFile) {
          const indexToRemove = unusedFiles.findIndex(
            (item) => item.name == matchedFile.name
          );
          if (indexToRemove !== -1) {
            unusedFiles.splice(indexToRemove, 1);
          }

          return { ...perk, imgUrl: matchedFile.path };
        } else {
          return perk;
        }
      } else {
        return perk;
      }
    });
    const finalFuse = { perks: matches, unused: unusedFiles };

    return updateFromDB(finalFuse);
  };

  const updateFromDB = async (fuseResult: FuseResult) => {
    const newFuse = { ...fuseResult };

    for (let i = 0; i < newFuse.perks.length; i++) {
      const perk = newFuse.perks[i];
      const res = await axios.get(
        "api.gibbonsiv.com:5000/" + "perkByName/" + perk.name
      );
      if (res.data.length > 0) {
        if (res.data[0].imgUrl != perk.imgUrl) {
          perk.imgUrl = res.data[0].imgUrl;
        }
        const indexPath = newFuse.unused.findIndex(
          (file) => file.path === res.data[0].imgUrl
        );
        if (indexPath >= 0) {
          newFuse.unused.splice(indexPath, 1);
        }
      }
    }

    return newFuse;
  };

  return (
    <div className="min-h-screen bg-gray-800 p-5">
      {fuseResult ? (
        <FuseFixer fuseResult={fuseResult} files={files} />
      ) : (
        <div>
          <div className="flex place-content-center gap-6 bg-slate-600 rounded-xl text-white text-xl ">
            {perkDefs.length > 0 ? (
              <div>Perk Defs Loaded</div>
            ) : (
              <div>Loading Perk Defs</div>
            )}
            {files.length > 0 ? (
              <div>Perk Files Loaded</div>
            ) : (
              <div>Loading Perk Files</div>
            )}
          </div>
          <div className="absolute bottom-0 sm:relative flex place-content-center m-5">
            {perkDefs.length > 0 && files.length > 0 && loading == false ? (
              <button
                className="button1"
                onClick={async () => {
                  setLoading(true);
                  setFuseResult(await fuseNames(perkDefs, files, 0.231));
                }}
              >
                Fuse Perks
              </button>
            ) : (
              <div>
                <p className="text-white font-bold text-lg">Loading...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface FuseFixerProps {
  fuseResult: FuseResult;
  files: File[];
}

const FuseFixer = ({ fuseResult, files }: FuseFixerProps) => {
  const [perkData, setPerkData] = useState(fuseResult);
  const [selNewImg, setSelNewImg] = useState(false);
  const [fixing, setFixing] = useState<FinalPerk>();
  const [missing, setMissing] = useState(perkData.unused.length);
  const [changed, setChanged] = useState(0);

  const handleClickedFix = (perk: FinalPerk) => {
    setSelNewImg(true);
    setFixing(perk);
  };

  const handleFuseController = (type: FuseControlENUM) => {
    if (type == FuseControlENUM.Save) {
      saveToDB(perkData.perks);
    }
    if (type == FuseControlENUM.Alpha) {
      sortAlpha();
    }
    if (type == FuseControlENUM.Missing) {
      sortMissingToTop();
    }
  };

  const saveToDB = async (perks: FinalPerk[]) => {
    const res = await axios.get("api.gibbonsiv.com:5000/" + "perks");
    const dbPerks = res.data as FinalPerk[];

    const perksToUpdate = perks.filter((newPerk) => {
      const existingPerk = dbPerks.find(
        (dbPerk) => dbPerk.name === newPerk.name
      );
      return (
        newPerk.imgUrl &&
        (!existingPerk || existingPerk.imgUrl !== newPerk.imgUrl)
      );
    });

    console.log(perksToUpdate);

    axios
      .post("api.gibbonsiv.com:5000/" + "updatePerks", perksToUpdate, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("response:", res);
      });
  };

  const sortMissingToTop = () => {
    const sortedPerks = perkData.perks.slice().sort((a, b) => {
      if (a.imgUrl && !b.imgUrl) {
        return 1;
      } else if (!a.imgUrl && b.imgUrl) {
        return -1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    const newPerkData = { ...perkData };
    newPerkData.perks = sortedPerks;
    setPerkData(newPerkData);
  };

  const sortAlpha = () => {
    const sortedPerks = perkData.perks.slice().sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    const newPerkData = { ...perkData };
    newPerkData.perks = sortedPerks;
    setPerkData(newPerkData);
  };

  const handleNewImage = (path: string) => {
    const updatedPerk = { ...fixing, imgUrl: path } as FinalPerk;

    const newPerkData = { ...perkData };

    const indexPath = newPerkData.unused.findIndex(
      (file) => file.path === path
    );
    if (indexPath >= 0) {
      newPerkData.unused.splice(indexPath, 1);
      setMissing(missing - 1);
    }

    const index = newPerkData.perks.findIndex(
      (perk) => perk.name === fixing?.name
    );
    if (index >= 0) {
      newPerkData.perks[index] = updatedPerk;
      setPerkData(newPerkData);
      setChanged(changed + 1);
    }
  };

  return (
    <div className="relative">
      <p className="text-white font-bold text-lg">
        Attempted to link Perk name to file name
      </p>
      <div className="flex flex-wrap gap-3 justify-center place-content-center">
        {perkData?.perks.map((perk) => {
          return (
            <PerkInfo perk={perk} onClick={handleClickedFix} key={perk.name} />
          );
        })}
      </div>
      {selNewImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 overflow-scroll"
          onClick={() => setSelNewImg(false)}
        >
          <div className="sticky top-2 opacity-80 text-white font-thin text-lg">
            <p className="absolute right-5">Click anywhere to dismiss</p>
          </div>

          <div className="flex place-content-center p-5">
            <div className="text-white bg-gray-500 rounded-lg shadow-xl max-w-fit p-2">
              <p className="p-2 text-center font-bold">Pick a new Image</p>
              {fixing && <PerkInfo perk={fixing} key={fixing.name + "1"} />}
            </div>
          </div>
          <p className="text-white ml-10 pb-2 font-semibold text-lg">
            Unused Images
          </p>
          <div className="flex flex-wrap gap-3 place-content-center">
            {perkData?.unused.map((item) => {
              return (
                <ImgInfo
                  path={item.path}
                  onClick={handleNewImage}
                  key={item.path + "2"}
                />
              );
            })}
          </div>
          <p className="mt-10 text-white ml-10 pb-2 font-semibold text-lg">
            All Images (A-Z)
          </p>
          <div className="flex flex-wrap gap-3 place-content-center mb-10">
            {files
              .slice() // Create a copy of the array to avoid modifying the original
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort by the 'name' property
              .map((file) => {
                return (
                  <ImgInfo
                    path={file.path}
                    onClick={handleNewImage}
                    key={file.path + "3"}
                  />
                );
              })}
          </div>
        </div>
      )}
      <FuseControls
        missing={missing}
        changed={changed}
        onClick={handleFuseController}
      />
    </div>
  );
};

enum FuseControlENUM {
  Save,
  Missing,
  Alpha,
}

interface FuseControlProps {
  missing: number;
  changed: number;
  onClick: (type: FuseControlENUM) => void;
}

const FuseControls = ({ missing, changed, onClick }: FuseControlProps) => {
  const handleClickSave = () => {
    onClick(FuseControlENUM.Save);
  };

  const handleClickAlpha = () => {
    onClick(FuseControlENUM.Alpha);
  };

  const handleClickMissing = () => {
    onClick(FuseControlENUM.Missing);
  };

  return (
    <div className="flex place-content-center sticky bottom-2">
      <div className="bg-blue-400 rounded-md max-w-fit h-24 sm:h-12 opacity-50 hover:opacity-100 transition-all duration-300 ease-linear pl-3 pr-3 shadow-md">
        <div className="grid justify-center place-content-center pt-2 gap-3 grid-flow-col text-center">
          <button
            className="button1 font-normal text-base p-1 pl-2 pr-2"
            onClick={handleClickSave}
          >
            Save
          </button>
          <button
            className="button1 font-normal text-base p-1 pl-2 pr-2"
            onClick={handleClickAlpha}
          >
            Sort By Name
          </button>
          <button
            className="button1 font-normal text-base p-1 pl-2 pr-2"
            onClick={handleClickMissing}
          >
            Missing to Top
          </button>
          <p className="text-white font-bold p-1 pl-2 pr-2">
            Unused: {missing}
          </p>
          <p className="text-white font-bold p-1 pl-2 pr-2">
            Changes: {changed}
          </p>
        </div>
      </div>
    </div>
  );
};

interface ImgInfoProps {
  path: string;
  onClick: (path: string) => void;
}

const ImgInfo = ({ path, onClick }: ImgInfoProps) => {
  const handleClick = () => {
    onClick(path);
  };
  return (
    <div
      className="text-white bg-gray-500 hover:bg-gray-400 rounded-md shadow-xl max-w-fit transition-all duration-150 ease-linear p-3"
      onClick={handleClick}
    >
      <img
        className="h-24"
        src={"api.gibbonsiv.com:5000/" + "perkimg/" + path}
      ></img>
    </div>
  );
};

interface PerkInfoProps {
  perk: FinalPerk;
  onClick?: (perk: FinalPerk) => void;
}

const PerkInfo = ({ perk, onClick }: PerkInfoProps) => {
  const [wasClicked, setWasClicked] = useState(false);
  const [imgChgd, setImgChgd] = useState(false);

  const handleClick = () => {
    if (onClick) {
      setWasClicked(true);
      onClick(perk);
    }
  };

  useEffect(() => {
    if (wasClicked) {
      setImgChgd(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perk.imgUrl]);

  return (
    <div className="bg-gray-600 min-w-fit p-2 rounded-xl gap-2">
      <div className="flex place-items-center justify-center">
        <img
          className="h-32"
          src={
            perk.imgUrl
              ? "api.gibbonsiv.com:5000/" + "perkimg/" + perk.imgUrl
              : ""
          }
        ></img>
        {perk.imgUrl ? (
          imgChgd ? (
            <p className="text-green-400 font-bold text-lg">{perk.name}</p>
          ) : (
            <p className="text-white font-bold text-lg">{perk.name}</p>
          )
        ) : (
          <p className="text-red-500 font-bold text-lg">{perk.name}</p>
        )}
      </div>
      {onClick && (
        <div className="flex justify-center">
          <button className="button1 text-base" onClick={handleClick}>
            Fix Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Devpage;
