import PreviewGrid from "../components/PreviewGrid";

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-gray-200 pt-2 mb-4">Home</h1>

      <PreviewGrid name="Recently Posted" expandable={true} />

      <PreviewGrid name="Top builds" expandable={true} />

      <PreviewGrid name="New from users you follow" expandable={true} />
    </div>
  );
};

export default Home;
