"use client";
import { useState } from "react";
import send from "./assets/send.svg";
import Image from "next/image";

export default function CustomerComplaint() {
  const [messages, setMessages] = useState([]);
  const [recentMessages, setRecentMessages] = useState([
    {
      id: 1,
      email: "Veekdesign@gmail.com",
      message: "I want to withdraw",
      time: "May 12, 2024 | 12:00 PM",
    },
    {
      id: 2,
      email: "Veekdesign@gmail.com",
      message: "I want to withdraw",
      time: "May 12, 2024 | 12:00 PM",
    },
    {
      id: 3,
      email: "Veekdesign@gmail.com",
      message: "I want to withdraw",
      time: "May 12, 2024 | 12:00 PM",
    },
    {
      id: 4,
      email: "Veekdesign@gmail.com",
      message: "I want to withdraw",
      time: "May 12, 2024 | 12:00 PM",
    },
    {
      id: 5,
      email: "Veekdesign@gmail.com",
      message: "I want to withdraw",
      time: "May 12, 2024 | 12:00 PM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

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
      setNewMessage(""); // Clear input field after sending
    }
  };

  const handleSelectChat = (chatId) => {
    // Find the messages for the selected chat
    const selectedChatMessages = recentMessages.filter(
      (chat) => chat.id === chatId
    );
    setMessages([
      {
        id: 1,
        user: selectedChatMessages[0].email,
        time: selectedChatMessages[0].time,
        text: selectedChatMessages[0].message,
        isUser: false,
      },
    ]);
    setSelectedChat(chatId); // Set the currently selected chat
  };

  return (
    <>
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <button
            // onClick={() => router.back()} // Navigates to the previous page
            className="text-[#ED1450] hover:underline text-base font-normal"
          >
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            Customer Complaints
          </h3>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full border font-Manrope">
        {/* Recent Messages Section */}
        <div className="lg:w-1/3 w-full bg-white border-x overflow-y-auto">
          <h2 className="text-[22px] font-semibold mb-4 font-Manrope border-b p-4 ">
            Recent
          </h2>
          {recentMessages.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectChat(item.id)}
              className="p-4 mb-4 bg-white border-b cursor-pointer"
            >
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">{item.email}</p>
                  <p className="text-gray-500">{item.message}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Messaging Section */}
        <div className="flex flex-col flex-1 bg-white text-white border-l border-b">
          {/* Header */}
          <div className="p-4 flex justify-between items-center bg-white font-Manrope">
            <h2 className="text-[20px] font-semibold font-Manrope">
              {selectedChat
                ? recentMessages.find((chat) => chat.id === selectedChat).email
                : "Select a chat"}
            </h2>
            <span className="text-base">{new Date().toLocaleTimeString()}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 border-t">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg flex items-center ${
                    msg.isUser
                      ? "bg-[#ED1450] text-white"
                      : "bg-[#F2F4F7] text-white"
                  }`}
                >
                  {!msg.isUser && (
                    <img
                      src="https://www.w3schools.com/w3images/avatar2.png" // Sender's profile picture
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  )}
                  <div>
                    <p className="text-sm text-black">{msg.text}</p>
                    <p className="text-xs mt-1 text-gray-400">{msg.time}</p>
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
    </>
  );
}
