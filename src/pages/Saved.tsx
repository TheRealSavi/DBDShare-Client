import PreviewGrid from "../components/PreviewGrid";

const Saved = () => {
  return (
    <div>
      <h1 className="text-center text-gray-200">Saved</h1>
      <PreviewGrid showMySaved={true} />
    </div>
  );
};

export default Saved;
