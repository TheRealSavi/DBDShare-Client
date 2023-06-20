import { BiErrorAlt } from "react-icons/bi";
import { getPerkInfo } from "./PerkList";

interface IPerkHoverProps {
  perk: string;
  transformX: number;
  transformY: number;
}

const PerkHover = (props: IPerkHoverProps) => {
  const perkInfo = getPerkInfo(props.perk);

  const sortCategoriesByCategoryName = () => {
    const names = perkInfo.categories.map((category) => category.name).sort();

    const sortedCategories = [{ name: "Error", icon: BiErrorAlt }];
    perkInfo.categories.forEach((category, index) => {
      sortedCategories[index] = {
        name: names[index],
        icon: category.icon,
      };
    });
    return sortedCategories;
  };

  const sortedCategories = sortCategoriesByCategoryName();

  Object.values(perkInfo.categories)
    .map((category) => category.name)
    .sort();

  return (
    <div className="fixed z-50 w-56 origin-left top-2 left-0 ml-10">
      <div className="">
        <p className="bg-indigo-400 w-full font-bold text-white pl-2">
          {perkInfo.name}
        </p>
        <div className="relative grid grid-cols-7 bg-zinc-900 font-bold text-white">
          {sortedCategories.map((category, i) => {
            return <category.icon size={28} key={i} className="mt-2 mb-2" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PerkHover;
