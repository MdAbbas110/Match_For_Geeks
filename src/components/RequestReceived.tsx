import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Profile } from "./Feed";
import { requestsList } from "../services/requestsList";
import { api } from "../lib/axios";

interface RequestData {
  _id: string;
  fromUserId: Profile;
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

type RequestDataList = {
  data: RequestData[];
};

const RequestReceived = () => {
  const queryClient = useQueryClient();

  const { mutate: reviewRequest } = useMutation({
    mutationFn: async ({ _id, status }: { _id: string; status: string }) => {
      const res = await api.post(`/request/review/${status}/${_id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receivedRequests"] });
    },
  });

  const {
    data: requests,
    isLoading,
    error,
  } = useQuery<RequestDataList>({
    queryKey: ["receivedRequests"],
    queryFn: requestsList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  if (!requests) {
    return <div>No requests found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Follow Requests</h2>
      <div className="space-y-4">
        {requests.data.map((request: RequestData) => (
          <div
            key={request._id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={request.fromUserId.photoUrl}
                alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}</p>
                <p className="text-gray-500 text-sm">
                  {request.fromUserId.about}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  reviewRequest({ _id: request._id, status: "accepted" })
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  reviewRequest({ _id: request._id, status: "rejected" })
                }
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestReceived;
