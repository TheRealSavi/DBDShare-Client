import { useState } from "react";
import PreviewGrid from "../components/PreviewGrid";
import SearchInput from "../components/SearchInput";
import { SearchProps } from "antd/es/input";
import { IBuildPreview, PreviewGridQueryType } from "../types/types";
import BuildPreview from "../components/BuildPreview";

const Home = () => {
  const [showingSearchResults, setShowingSearchResults] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [inspectingBuild, setInspectingBuild] = useState<IBuildPreview>();

  const handleSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
    setSearchBarValue(value);
    setShowingSearchResults(true);
  };

  const handleBacktoFeed = () => {
    setShowingSearchResults(false);
  };

  const handleBuildInspection = (build: IBuildPreview) => {
    setInspectingBuild(build);
  };

  const BuildInspector = (build: IBuildPreview) => {
    return (
      <div
        className="flex place-content-center items-center h-screen"
        onClick={() => {
          setInspectingBuild(undefined);
        }}
      >
        <div className="drop-shadow-lg bg-gradient-to-r from-cyan-900 to-blue-900 rounded-2xl p-1">
          <BuildPreview {...build} full={true}></BuildPreview>
        </div>
      </div>
    );
  };

  return (
    <div>
      {inspectingBuild ? (
        <div className="absolute z-50 w-full">
          <BuildInspector {...inspectingBuild}></BuildInspector>
        </div>
      ) : (
        <></>
      )}
      <div
        className={inspectingBuild ? "blur-lg max-h-screen overflow-clip" : ""}
      >
        <div className="flex place-content-center p-3 sticky top-0 z-40 backdrop-blur-3xl backdrop-opacity-100 backdrop-brightness-120 rounded-b-md">
          {showingSearchResults && (
            <button
              className="button2 text-red-400 ml-2 mr-2"
              onClick={handleBacktoFeed}
            >
              Back to feed
            </button>
          )}
          <div className="flex-grow max-w-5xl ">
            <SearchInput
              placeholderText="Search builds..."
              onSearch={handleSearch}
            />
          </div>
        </div>

        {showingSearchResults ? (
          <div>
            <PreviewGrid
              name="Search Results"
              queryType={PreviewGridQueryType.searchPosts}
              searchQuery={searchBarValue}
              handleBuildInspection={handleBuildInspection}
            ></PreviewGrid>
          </div>
        ) : (
          <div>
            <PreviewGrid
              name="Recently Posted"
              queryType={PreviewGridQueryType.recentPosts}
              handleBuildInspection={handleBuildInspection}
            />

            <PreviewGrid
              name="Top builds"
              queryType={PreviewGridQueryType.hotPosts}
              handleBuildInspection={handleBuildInspection}
            />

            <PreviewGrid
              name="New from users you follow"
              queryType={PreviewGridQueryType.followingPosts}
              handleBuildInspection={handleBuildInspection}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
