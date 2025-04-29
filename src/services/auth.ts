import { api } from "../lib/axios";

type LoginPayload = {
  emailId: string;
  password: string;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/login", {
    emailId: data.emailId,
    password: data.password,
  });
  return response.data;
};
