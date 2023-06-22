import PreviewGrid from "../components/PreviewGrid";

const Saved = () => {
  return (
    <div>
      <h1 className="text-center text-gray-200 pt-2 mb-4">Saved Posts</h1>
      <div className="grid place-items-center">
        <PreviewGrid showMySaved={true} />
      </div>
    </div>
  );
};

export default Saved;
