import { useQuery } from "@tanstack/react-query";
import { feedProfile } from "../services/feedProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";

export interface Profile {
  _id: string;
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

  const { data, status, error } = useQuery<FeedApiResponse>({
    queryKey: ["feed"],
    queryFn: feedProfile,
  });

  useEffect(() => {
    if (data) {
      dispatch(addFeed(data));
    }
  }, [data, dispatch]);

  if (status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-lg font-medium text-base-content/70">
            Finding potential matches...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-error/10 p-4 rounded-full inline-block mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-error">
            Error loading profiles
          </p>
          <p className="mt-2 text-base-content/70">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-info/10 p-4 rounded-full inline-block mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-info"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium">No profiles available</p>
          <p className="mt-2 text-base-content/70">
            Check back later for new matches
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Discover Your Match
        <div className="badge badge-primary ml-2">{data.length}</div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {data.map((profile, index) => (
          <div
            key={profile._id}
            className="transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            <UserCard profileData={profile} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
