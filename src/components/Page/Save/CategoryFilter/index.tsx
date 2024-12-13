import Image from "next/image";
import styles from "./categoryFilter.module.scss";
import classNames from "classnames/bind";
import { category, categoryNameMap } from "@/constants/category";
import { useRef, useState, MouseEvent } from "react";

const cn = classNames.bind(styles);

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleCategoryClick = (clickedCategory: string) => {
    if (!isDragging) {
      if (selectedCategories.includes(clickedCategory)) {
        onCategoryChange(
          selectedCategories.filter((cat) => cat !== clickedCategory)
        );
      } else {
        onCategoryChange([...selectedCategories, clickedCategory]);
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const filteredCategories = category.filter((item) => item !== "none");

  return (
    <div
      ref={containerRef}
      className={cn("container")}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {filteredCategories.map((item) => (
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
