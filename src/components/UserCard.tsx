import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile } from "./Feed";
import { api } from "../lib/axios";

interface UserCardProps {
  profileData: Profile;
}

const UserCard = ({ profileData }: UserCardProps) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } =
    profileData;
  const queryClient = useQueryClient();

  const { mutate: handleProfileAction } = useMutation({
    mutationFn: async ({ _id, action }: { _id: string; action: string }) => {
      const res = await api.post(`/request/send/${action}/${_id}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: () => {
      console.log("Failed to perform action request");
    },
  });

  return (
    <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent z-10" />
        <img
          className="w-full h-64 object-cover"
          src={photoUrl}
          alt={`${firstName}'s profile`}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex items-center gap-2">
            <div className="badge badge-primary">{age} years</div>
            <div className="badge badge-secondary">{gender}</div>
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName}
        </h2>
        <div className="divider my-2" />
        <p className="text-base-content/80">{about}</p>
        <div className="card-actions justify-end mt-4">
          <div className="flex gap-4">
            <button
              onClick={() => handleProfileAction({ _id, action: "ignored" })}
              className="btn btn-circle btn-outline btn-error"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              onClick={() => handleProfileAction({ _id, action: "interested" })}
              className="btn btn-circle btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
