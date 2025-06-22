import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useState } from "react";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.userReducer);
  const userId = user?._id;

  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);

  console.log(userId, "userId", user);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, toUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName, text, "fromuseEffect");
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, toUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      toUserId,
      text: newMsg,
    });
    setNewMsg("");
  };

  console.log(messages, "messages");

  return (
    <div className="rounded-md h-[70vh] shadow-sm m-10 border-1 flex flex-col">
      <h1 className="p-2 border-b-2">Chat</h1>
      <div className="flex-1 p-2 overflow-y-scroll"></div>
      <div className="p-2 flex gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input w-full"
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
