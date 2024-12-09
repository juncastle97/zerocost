import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import { useAtom } from "jotai";
import { selectedItemsAtom } from "@/lib/atoms/selectedItems";
import { selectedIdsAtom } from "@/lib/atoms/selectedIds";

import styles from "./checkBox.module.scss";

const cn = classNames.bind(styles);

interface CheckBoxProps {
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  savingId?: number;
}

export default function CheckBox({
  onChange,
  defaultChecked = false,
  savingId,
}: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [, setSelectedCount] = useAtom(selectedItemsAtom);
  const [selectedIds, setSelectedIds] = useAtom(selectedIdsAtom);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setSelectedCount((prev) => (newChecked ? prev + 1 : prev - 1));

    if (savingId) {
      if (newChecked) {
        setSelectedIds([...selectedIds, savingId]);
      } else {
        setSelectedIds(selectedIds.filter((id) => id !== savingId));
      }
    }

    onChange?.(newChecked);
  };

  return (
    <label className={cn("checkboxWrap")}>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <Image
        src={`/icons/ic-check-state-${isChecked ? "on" : "off"}.svg`}
        alt="체크박스"
        width={24}
        height={24}
      />
    </label>
  );
}
