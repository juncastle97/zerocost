import { instance } from "./axios";

export interface BadgeItem {
  badgeId: number;
  badgeName: string;
  badgeDescription: string;
  emblemPath: string;
  badgeType: string;
  badgeTypeKr: string;
  acquireYN: string;
  count: number;
  operator: string;
  value: string;
  rgstDt: string;
  rgstId: number;
  updtDt: string;
  updtId: number;
}

export const getBadgesList = async () => {
  try {
    const response = await instance.get<BadgeItem[]>("/api/badges/list");
    return response.data;
  } catch (error) {
    console.error("get badge list 요청 실패:", error);
    throw error;
  }
};

export const getBadges = async (badgeId: number) => {
  try {
    const response = await instance.get(`/api/badges/${badgeId}`);
    return response.data;
  } catch (error) {
    console.error("get badge 요청 실패:", error);
    throw error;
  }
};

// export const getAdminBadgesList = async () => {
//   try {
//     const response = await instance.get("/api/admin/badges");
//     return response.data;
//   } catch (error) {
//     console.error("get admin badge list 요청 실패:", error);
//     throw error;
//   }
// };

// export const postAdminBadgesList = async (data: BadgeItem) => {
//   try {
//     const response = await instance.get("/api/admin/badges", data);
//     return response.data;
//   } catch (error) {
//     console.error("post admin badge list 요청 실패:", error);
//     throw error;
//   }
// };

// export const putAdminBadgesList = async (data: BadgeItem) => {
//   try {
//     const response = await instance.get("/api/admin/badges/list", data);
//     return response.data;
//   } catch (error) {
//     console.error("put admin badge list 요청 실패:", error);
//     throw error;
//   }
// };

// export const deleteAdminBadgesList = async (badgeId: number) => {
//   try {
//     const response = await instance.get(`/api/admin/badges/${badgeId}`);
//     return response.data;
//   } catch (error) {
//     console.error("delete admin badge list 요청 실패:", error);
//     throw error;
//   }
// };
