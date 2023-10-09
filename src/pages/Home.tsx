import { useState } from "react";
import PreviewGrid from "../components/PreviewGrid";
import SearchInput from "../components/SearchInput";
import { SearchProps } from "antd/es/input";
import { PreviewGridQueryType } from "../types/types";

const Home = () => {
  const [showingSearchResults, setShowingSearchResults] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");

  const handleSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
    setSearchBarValue(value);
    setShowingSearchResults(true);
  };

  const handleBacktoFeed = () => {
    setShowingSearchResults(false);
  };

  return (
    <div>
      <h1 className="text-center text-gray-200 pt-2 mb-4">Home</h1>

      <div className="flex place-content-center p-3 sticky top-0 z-50 bg-slate-800">
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
          ></PreviewGrid>
        </div>
      ) : (
        <div>
          <PreviewGrid
            name="Recently Posted"
            queryType={PreviewGridQueryType.recentPosts}
          />

          <PreviewGrid
            name="Top builds"
            queryType={PreviewGridQueryType.hotPosts}
          />

          <PreviewGrid
            name="New from users you follow"
            queryType={PreviewGridQueryType.followingPosts}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
