import Image from "next/image";
import classNames from "classnames/bind";
import { useAtom } from "jotai";

import styles from "./categorySelector.module.scss";
import { category, categoryNameMap } from "@/constants/category";
import { selectedCategoryAtom } from "@/lib/atoms/category";

const cn = classNames.bind(styles);

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  return (
    <div className={cn("container")}>
      <div className={cn("grid")}>
        {category
          .filter((item) => item !== "none")
          .map((item) => (
            <button
              key={item}
              type="button"
              className={cn("iconWrapper", {
                selected: selectedCategory === item,
              })}
              onClick={() => setSelectedCategory(item)}
            >
              <div>
                <Image
                  src={`/icons/ic-${item}.svg`}
                  alt={`${categoryNameMap[item]} 아이콘`}
                  width={40}
                  height={40}
                />
              </div>
              <span className={cn("label")}>{categoryNameMap[item]}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
