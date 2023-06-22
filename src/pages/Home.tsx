import PreviewGrid from "../components/PreviewGrid";

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-gray-200 pt-2 mb-4">Home</h1>
      <div className="grid place-items-center">
        <PreviewGrid />
      </div>
    </div>
  );
};

export default Home;
