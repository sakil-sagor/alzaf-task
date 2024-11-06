import CategoryItem from "./CategoryItem";
const BannerCategory = ({ data }) => {
  return (
    <div className="relative pl-4 py-4 flex flex-col justify-between  bg-white  min-h-full  w-72">
      {data.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
};

export default BannerCategory;
