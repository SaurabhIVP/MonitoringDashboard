// apiService.ts
import { axiosInstance } from "./AxiosConfig";

export const apiService = {
  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  },
};
