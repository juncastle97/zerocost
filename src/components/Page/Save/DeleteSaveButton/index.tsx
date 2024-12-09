import classNames from "classnames/bind";
import Image from "next/image";
import { useAtom } from "jotai";

import styles from "./deleteSaveButton.module.scss";
import { listEditState } from "@/lib/atoms/list";
import { selectedItemsAtom } from "@/lib/atoms/selectedItems";
import { selectedIdsAtom } from "@/lib/atoms/selectedIds";
import { deleteVirtualItem } from "@/lib/apis/virtualItems";

const cn = classNames.bind(styles);

interface DeleteSaveButtonProps {
  onDelete?: () => void;
}

export default function DeleteSaveButton({ onDelete }: DeleteSaveButtonProps) {
  const [, setIsEdit] = useAtom(listEditState);
  const [selectedCount] = useAtom(selectedItemsAtom);
  const [selectedIds, setSelectedIds] = useAtom(selectedIdsAtom);

  const handleDeleteClick = async () => {
    try {
      // 모든 선택된 아이템 삭제
      await Promise.all(selectedIds.map((id) => deleteVirtualItem(id)));

      // 상태 초기화
      setIsEdit(false);
      setSelectedIds([]);

      // 데이터 다시 불러오기
      onDelete?.();
    } catch (error) {
      console.error("Failed to delete items:", error);
    }
  };

  return (
    <>
      <div className={cn("selected")}>{selectedCount}개 선택</div>
      <button className={cn("delete")} onClick={handleDeleteClick}>
        <Image
          src="/icons/ic-delete-state-on.svg"
          alt="삭제 아이콘"
          width={24}
          height={24}
        />
      </button>
    </>
  );
}
