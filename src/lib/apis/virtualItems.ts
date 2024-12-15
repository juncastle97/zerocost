import { instance } from "./axios";
import { getMemberId } from "../utils/memberId";

const memberId = getMemberId();

interface VirtualItem {
  savingYmd: string;
  categoryName: string;
  amount: number;
}

export const postVirtualItem = async (data: VirtualItem) => {
  try {
    const response = await instance.post(
      `/api/virtual-items?memberId=${memberId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("post virtualItem 요청 실패:", error);
    throw error;
  }
};

export const getVirtualItemList = async (year: number, month: number) => {
  try {
    const response = await instance.get(
      `/api/virtual-items/list/${year}/${month}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("get listData 요청 실패:", error);
    throw error;
  }
};

export const getVirtualItemCalendar = async (year: number, month: number) => {
  try {
    const response = await instance.get(
      `/api/virtual-items/calendar/${year}/${month}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("get calendarData 요청 실패:", error);
    throw error;
  }
};

export const getVirtualItem = async (savingId: number) => {
  try {
    const response = await instance.get(
      `/api/virtual-items/${savingId}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("get virtualItem 요청 실패:", error);
    throw error;
  }
};

export const putVirtualItem = async (savingId: number, data: VirtualItem) => {
  try {
    const response = await instance.put(
      `/api/virtual-items/${savingId}?memberId=${memberId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("put virtualItem 요청 실패:", error);
    throw error;
  }
};

export const deleteVirtualItem = async (savingId: number) => {
  try {
    await instance.delete(
      `/api/virtual-items/${savingId}?memberId=${memberId}`
    );
  } catch (error) {
    console.error("delete virtualItem 요청 실패:", error);
    throw error;
  }
};

export const patchVirtualItem = async (savingId: number) => {
  try {
    const response = await instance.patch(
      `/api/virtual-items/${savingId}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("patch virtualItem 요청 실패:", error);
    throw error;
  }
};

// memberId 붙이기 전 코드
// export const postVirtualItem = async (data: VirtualItem) => {
//   try {
//     const response = await instance.post("/api/virtual-items", data);
//     return response.data;
//   } catch (error) {
//     console.error("post virtualItem 요청 실패:", error);
//     throw error;
//   }
// };

// export const getVirtualItemList = async (year: number, month: number) => {
//   try {
//     const response = await instance.get(
//       `/api/virtual-items/list/${year}/${month}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("get listData 요청 실패:", error);
//     throw error;
//   }
// };

// export const getVirtualItemCalendar = async (year: number, month: number) => {
//   try {
//     const response = await instance.get(
//       `/api/virtual-items/calendar/${year}/${month}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("get calendarData 요청 실패:", error);
//     throw error;
//   }
// };

// export const getVirtualItem = async (savingId: number) => {
//   try {
//     const response = await instance.get(`/api/virtual-items/${savingId}`);
//     return response.data;
//   } catch (error) {
//     console.error("get virtualItem 요청 실패:", error);
//     throw error;
//   }
// };

// export const putVirtualItem = async (savingId: number, data: VirtualItem) => {
//   try {
//     const response = await instance.put(`/api/virtual-items/${savingId}`, data);
//     return response.data;
//   } catch (error) {
//     console.error("put virtualItem 요청 실패:", error);
//     throw error;
//   }
// };

// export const deleteVirtualItem = async (savingId: number) => {
//   try {
//     await instance.delete(`/api/virtual-items/${savingId}`);
//   } catch (error) {
//     console.error("delete virtualItem 요청 실패:", error);
//     throw error;
//   }
// };

// export const patchVirtualItem = async (savingId: number) => {
//   try {
//     const response = await instance.patch(`/api/virtual-items/${savingId}`);
//     return response.data;
//   } catch (error) {
//     console.error("patch virtualItem 요청 실패:", error);
//     throw error;
//   }
// };
