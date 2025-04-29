import { useQuery } from "@tanstack/react-query";
import { feedProfile } from "../services/feedProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";

export interface Profile {
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  age: string;
  gender: string;
  skills?: string[];
}

export type FeedApiResponse = Profile[];

const Feed = () => {
  const dispatch = useDispatch();

  const { data, status } = useQuery<FeedApiResponse>({
    queryKey: ["feed"],
    queryFn: feedProfile,
  });

  useEffect(() => {
    if (data) {
      dispatch(addFeed(data));
    }
  }, [data, dispatch]);

  if (status === "pending") {
    return <p>Pending</p>;
  }

  console.log(data);
  return (
    <div className="flex justify-center my-10">
      {data && data.length > 0 ? (
        <UserCard profileData={data[6]} />
      ) : (
        <div>No profile data available</div>
      )}
    </div>
  );
};

export default Feed;
