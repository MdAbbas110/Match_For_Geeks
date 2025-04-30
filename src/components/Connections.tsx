import { useQuery, useQueryClient } from "@tanstack/react-query";
import { connectionsList } from "../services/connectionsList";
import { Profile } from "./Feed";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addConnectionList } from "../redux/connectionSlice";

export interface ConnectionUser {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  age: string;
  gender: string;
}

export interface Connection {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "accepted" | "rejected";
  fromUserId: ConnectionUser;
  toUserId: ConnectionUser;
}

export interface ConnectionsResponse {
  data: Connection[];
}

const Connections = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<Profile>(["user"]);

  const { data: connections } = useQuery<ConnectionsResponse>({
    queryKey: ["connections"],
    queryFn: connectionsList,
  });

  useEffect(() => {
    if (connections?.data) {
      dispatch(addConnectionList(connections));
    }
  }, [connections, dispatch]);

  if (!connections?.data) return null;
  if (!user) return null;

  return (
    <div className="flex flex-col items-center my-10 ">
      <h1 className="font-bold text-2xl underline mb-8">
        {user.firstName}'s connections
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.data.map((connection) => (
          <div key={connection._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex gap-3">
                <img
                  src={connection.fromUserId.photoUrl}
                  alt="img"
                  className="size-8 rounded-full"
                />
                <h2 className="card-title">
                  {connection.fromUserId.firstName}{" "}
                  {connection.fromUserId.lastName}
                </h2>
              </div>
              <p>{connection.fromUserId.about}</p>
              <div className="card-actions justify-center mt-4">
                <div className="badge badge-primary">
                  Chat with {connection.fromUserId.firstName}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
