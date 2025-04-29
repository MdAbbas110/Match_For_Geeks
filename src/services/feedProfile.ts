import { api } from "../lib/axios";

export const feedProfile = async () => {
  const response = await api.get("/user/feed");

  return response.data;
};
