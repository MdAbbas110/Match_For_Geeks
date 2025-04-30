import { api } from "../lib/axios";

export const requestsList = async () => {
  const response = await api.get("/user/requests/received");
  return response.data;
};

export const reviewRequest = async (status: string, _id: string) => {
  const res = await api.post(`/request/review/${status}/${_id}`);
  return res;
};
