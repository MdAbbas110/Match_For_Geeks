// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { connectionsList } from "../services/connectionsList";
// import { Profile } from "./Feed";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addConnectionList } from "../redux/connectionSlice";
// import { Link } from "react-router-dom";

// export interface ConnectionUser {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   photoUrl: string;
//   about: string;
//   age: string;
//   gender: string;
// }

// export interface Connection {
//   _id: string;
//   createdAt: string;
//   updatedAt: string;
//   status: "pending" | "accepted" | "rejected";
//   fromUserId: ConnectionUser;
//   toUserId: ConnectionUser;
// }

// export interface ConnectionsResponse {
//   data: Connection[];
// }

// const Connections = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();

//   const user = queryClient.getQueryData<Profile>(["user"]);

//   const { data: connections } = useQuery<ConnectionsResponse>({
//     queryKey: ["connections"],
//     queryFn: connectionsList,
//   });

//   console.log(connections);

//   useEffect(() => {
//     if (connections?.data) {
//       dispatch(addConnectionList(connections));
//     }
//   }, [connections, dispatch]);

//   if (!connections?.data) return null;
//   if (!user) return null;

//   return (
//     <div className="flex flex-col items-center my-10 ">
//       <h1 className="font-bold text-2xl underline mb-8">
//         {user.firstName}'s connections
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {connections.data.map((connection) => (
//           <div key={connection._id} className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <div className="flex gap-3">
//                 <img
//                   src={connection.fromUserId.photoUrl}
//                   alt="img"
//                   className="size-8 rounded-full"
//                 />
//                 <h2 className="card-title">
//                   {connection.fromUserId.firstName}{" "}
//                   {connection.fromUserId.lastName}
//                 </h2>
//               </div>
//               <p>{connection.fromUserId.about}</p>
//               <div className="card-actions justify-center mt-4">
//                 <Link to={`/messages/${connection._id}`}>
//                   <div className="badge badge-primary">
//                     Chat with {connection.fromUserId.firstName}
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Connections;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addConnectionList } from "../redux/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnectionList(res.data.data));
      console.log(res.data);
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link to={"/message/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
