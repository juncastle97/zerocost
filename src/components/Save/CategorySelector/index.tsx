import classNames from "classnames/bind";

import styles from "./categorySelector.module.scss";

const cn = classNames.bind(styles);
import Image from "next/image";

import Button from "@/components/Button";

const category = [
  "alcohol",
  "chicken",
  "closet",
  "coffee",
  "cosmetic",
  "dessert",
  "drink",
  "fandom",
  "game",
  "hair",
  "meal",
  "movie",
  "smoke",
  "taxi",
  "travel",
];

const categoryNameMap: { [key: string]: string } = {
  alcohol: "술",
  chicken: "야식",
  closet: "쇼핑",
  coffee: "커피",
  cosmetic: "화장품",
  dessert: "디저트",
  drink: "음료",
  fandom: "덕질",
  game: "취미",
  hair: "미용",
  meal: "밥",
  movie: "영화",
  smoke: "담배",
  taxi: "차비",
  travel: "여행",
};

export default function CategorySelector() {
  return (
    <div className={cn("container")}>
      <div className={cn("grid")}>
        {category.map((item) => (
          <button key={item} type="button" className={cn("iconWrapper")}>
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
      <Button className={cn("button")}>다음</Button>
    </div>
  );
}
