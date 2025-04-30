import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser, UserType } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (data) dispatch(addUser(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (error && axios.isAxiosError(error) && error.response?.status === 401) {
      // navigate("/signup");
    } else if (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }, [error, navigate]);

  return { data, error, isLoading };
};
