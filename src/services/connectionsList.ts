import { api } from "../lib/axios";

export const connectionsList = async () => {
  const response = await api.get("user/connections");
  return response.data;
};
