"use client";
import { useEffect, useState } from "react";
import send from "./assets/send.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { complaintsDisplay, replyComplaint } from "../adminControllers/complaintController";

export default function CustomerComplaint() {
  const [messages, setMessages] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchMessages = async () => {
    setLoading(true);
    const response = await complaintsDisplay({});
    setRecentMessages(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMessageData = {
        id: messages.length + 1,
        user: "You",
        time: new Date().toLocaleTimeString(),
        text: newMessage,
        isUser: true,
      };

      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage("");
       reply(newMessageData)
    }
  };

  const reply = async(newMsg) =>{
    console.log(newMsg)
 await replyComplaint(
  `${newMsg.id}`,
  {body: newMsg.text},
  (response)=>{
    console.log(response)
  },
  (err)=>{
    console.error('unable to send reply', err)
  }

 )
  }

  const handleSelectChat = (chatId) => {
    const selectedChat = recentMessages.find((chat) => chat.id === chatId);
  
    if (selectedChat) {
      const chatMessages = selectedChat.messages.map((msg) => ({
        id: msg.id,
        user: selectedChat.email, 
        time: new Date(msg.created_at).toLocaleTimeString(), 
        text: msg.body, 
        isUser: false, 
      }));
  
      setMessages(chatMessages);
      setSelectedChat(chatId); 
    }
  };
  

  const router = useRouter();

  return (
    <>
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            Customer Complaints
          </h3>
        </div>
      </div>
      {loading ? (
        <div>Loading messages....</div>
      ) : (
        <div className="flex flex-col lg:flex-row h-full border font-Manrope">
          {/* Recent Messages Section */}
          <div className="lg:w-1/3 w-full bg-white border-x overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 font-Manrope border-b p-4 ">
              Recent
            </h2>
            {!recentMessages || recentMessages.length === 0 ? (
              <div className="text-center text-[#5F6D7E]">
                No messages available to display.
              </div>
            ) : null}
          {recentMessages.map((item) => (
  <div
    key={item.id}
    onClick={() => handleSelectChat(item.id)}
    className="p-4 mb-4 bg-white border-b cursor-pointer"
  >
    <div className="flex items-center">
      <div>
        <p className="font-semibold text-base">{item.email}</p>
        <p className="text-gray-500 text-sm">
          {item.messages.length > 0
            ? item.messages[item.messages.length - 1].body
            : "No messages yet."}
        </p>
        <p className="text-xs text-gray-400">
          {item.messages.length > 0
            ? new Date(
                item.messages[item.messages.length - 1].created_at
              ).toLocaleTimeString()
            : ""}
        </p>
      </div>
    </div>
  </div>
))}

          </div>

          {/* Messaging Section */}
          <div className="flex flex-col flex-1 bg-white text-white border-l border-b">
            {/* Header */}
            <div className="p-4 flex justify-between items-center bg-white text-sm font-Manrope">
              <h2 className="text-base font-semibold font-Manrope">
                {selectedChat
                  ? recentMessages.find((chat) => chat.id === selectedChat)
                      .email
                  : "Select a chat"}
              </h2>
              <span className="text-xs">{new Date().toLocaleTimeString()}</span>
            </div>

            {/* Messages */}
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 border-t ">
              {messages.map((msg) => (
                <div key={msg.id} className="chat-box p-2 w-full">
                {/* Header */}
                <div
                  className={`flex ${
                    !msg.isUser ? '' : "justify-end"
                  }`}
                >
                  {!msg.isUser && (
                    <img
                      src="https://via.placeholder.com/40" // Replace with user image URL if available
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-5 justify-between mb-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-xs text-gray-800">
                          {msg.isUser ? 'You': msg.user}
                        </h4>
                        <span className="text-xs text-gray-500">
                        {msg.time}
                        </span>
                      </div>
                    </div>
                    {/* Message Body */}
                    <div
                      className={`message-body rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-md p-2 shadow-sm ${
                        msg.isUser
                          ? "bg-[#ED1450] "
                          : "bg-[#F2F4F7]"
                      }`}
                    >
                      <p className={`font-light text-sm ${
                        msg.isUser
                          ? " text-white"
                          : " text-black"
                      }`}>{msg.text}</p>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="p-4 bg-white flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Message......"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-[16px] rounded-full bg-[#F2F4F7] text-black focus:outline-none focus:ring focus:ring-[#ED1450]"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-2 rounded-full text-white"
                >
                  <Image
                    src={send.src}
                    alt="send icon"
                    width={40}
                    height={40}
                    priority
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
