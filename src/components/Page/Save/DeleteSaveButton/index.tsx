import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";

import Portal from "@/components/commons/Modal/potal";
import { deleteVirtualItem } from "@/lib/apis/virtualItems";
import { listEditState } from "@/lib/atoms/list";
import { selectedIdsAtom } from "@/lib/atoms/selectedIds";
import { selectedItemsAtom } from "@/lib/atoms/selectedItems";
import { toastAtom } from "@/lib/atoms/toast";
import styles from "./deleteSaveButton.module.scss";

const cn = classNames.bind(styles);

interface DeleteSaveButtonProps {
  onDelete?: () => void;
}

export default function DeleteSaveButton({ onDelete }: DeleteSaveButtonProps) {
  const [, setIsEdit] = useAtom(listEditState);
  const [selectedCount, setSelectedCount] = useAtom(selectedItemsAtom);
  const [selectedIds, setSelectedIds] = useAtom(selectedIdsAtom);
  const [, setToast] = useAtom(toastAtom);

  const handleDeleteClick = async () => {
    try {
      // 토스트 메시지 먼저 표시
      setToast({ isVisible: true, count: selectedCount, type: "multiple" });

      // 모든 선택된 아이템 삭제
      await Promise.all(selectedIds.map((id) => deleteVirtualItem(id)));

      // 상태 초기화
      setIsEdit(false);
      setSelectedIds([]);
      setSelectedCount(0);

      // 데이터 다시 불러오기
      onDelete?.();
    } catch (error) {
      console.error("Failed to delete items:", error);
      // 에러 발생 시 토스트 메시지 업데이트
      setToast({ isVisible: true, count: 0, type: "multiple" });
      // 상태 초기화하지 않고 유지
    }
  };

  return (
    <Portal>
      <div className={cn("selected")}>{selectedCount}개 선택</div>
      <button
        className={cn("delete")}
        onClick={handleDeleteClick}
        disabled={selectedCount === 0}
      >
        <Image
          src={
            selectedCount === 0
              ? "/icons/ic-delete-state-off.svg"
              : "/icons/ic-delete-state-on.svg"
          }
          alt="삭제 아이콘"
          width={24}
          height={24}
        />
      </button>
      <style>
        {`
          #bottomGnb {
            display: none;
          }
        `}
      </style>
    </Portal>
  );
}
