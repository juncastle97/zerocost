import Image from "next/image";
import styles from "./categoryFilter.module.scss";
import classNames from "classnames/bind";
import { category, categoryNameMap } from "@/constants/category";

const cn = classNames.bind(styles);

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const handleCategoryClick = (clickedCategory: string) => {
    if (selectedCategories.includes(clickedCategory)) {
      onCategoryChange(
        selectedCategories.filter((cat) => cat !== clickedCategory)
      );
    } else {
      onCategoryChange([...selectedCategories, clickedCategory]);
    }
  };

  return (
    <div className={cn("container")}>
      {category.map((item) => (
        <button
          key={item}
          type="button"
          className={cn("iconWrapper", {
            selected: selectedCategories.includes(item),
          })}
          onClick={() => handleCategoryClick(item)}
        >
          <div>
            <Image
              src={`/icons/ic-${item}.svg`}
              alt={`${categoryNameMap[item]} 아이콘`}
              width={16}
              height={16}
            />
          </div>
          <span className={cn("label")}>{categoryNameMap[item]}</span>
        </button>
      ))}
    </div>
  );
}
