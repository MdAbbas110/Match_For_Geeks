import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../lib/socket";
import { useQueryClient } from "@tanstack/react-query";

const Messages = () => {
  const { targetUserId } = useParams();
  const queyClient = useQueryClient();

  const currentUser = queyClient.getQueryData<{
    _id: string;
    firstName: string;
  }>(["user"]);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  if (!currentUser) return <p>No user found</p>;
  const { _id: userId } = currentUser;

  // as soon as the page loads connect to the server and get the socket object
  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: currentUser.firstName,
      userId,
      targetUserId,
    });

    //socket.on will help you to listen from the backend coming socket.
    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    setNewMessage("");
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: currentUser.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
  };

  return (
    <div className="w-3/4 mx-auto border rounded-xl border-pink-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-4 border-b border-pink-200">
        {currentUser?.firstName}'s chat{" "}
      </h1>
      <div className="flex-1 overflow-scroll p-4">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div className="chat chat-start">
              <div className="chat-header">
                {msg?.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <div className="p-5 border-t rounded-b-xl bg-pink-200 grid grid-cols-6 w-full">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send message"
            className="border bg-white col-span-5 p-3 rounded-3xl rounded-r"
            type="text"
          />
          <button
            onClick={sendMessage}
            className=" bg-green-300 border-r border-b border-t col-span-1 rounded-l rounded-3xl "
          >
            send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;
