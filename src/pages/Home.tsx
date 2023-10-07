import { useState } from "react";
import PreviewGrid from "../components/PreviewGrid";
import SearchInput from "../components/SearchInput";
import { SearchProps } from "antd/es/input";

const Home = () => {
  const [showingSearchResults, setShowingSearchResults] = useState(false);

  const handleSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
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
          <PreviewGrid name="Search Results"></PreviewGrid>
        </div>
      ) : (
        <div>
          <PreviewGrid name="Recently Posted" />

          <PreviewGrid name="Top builds" />

          <PreviewGrid name="New from users you follow" />
        </div>
      )}
    </div>
  );
};

export default Home;
