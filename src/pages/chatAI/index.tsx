import React, { useState } from "react";
import { PiSidebarSimpleBold } from "react-icons/pi";
import { MdAddToPhotos, MdSend } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

const ChatAI = () => {
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null); // Trạng thái cho bài viết được chọn

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(selectedArticle === article ? null : article); // Chọn hoặc bỏ chọn bài viết
  };

  const handleDelete = () => {
    if (selectedArticle) {
      console.log(`Bài viết "${selectedArticle}" đã bị xóa`);
      setSelectedArticle(null);
    }
  };

  // Dữ liệu bài viết
  const articles = {
    today: ["Thiết kế giao ", "hello"],
    yesterday: [],
    last7Days: ["Cập nhật code"],
    last30Days: ["Test"],
  };

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-[#f9f9f9] p-4 overflow-hidden transition-all duration-300`}
      >
        <div
          className={`flex items-center gap-2 ${
            sidebarOpen ? "justify-between" : "flex-col"
          } mb-6`}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500"
          >
            <PiSidebarSimpleBold size={24} />
          </button>
          <button onClick={handleNewChat} className="text-gray-500">
            <MdAddToPhotos size={24} />
          </button>
        </div>
        {sidebarOpen && (
          <div className="flex flex-col text-black rounded-lg h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Hôm nay */}
            <h2 className="font-bold mb-2">Hôm nay</h2>
            <ul className="flex flex-col gap-1 mb-4 ">
              {articles.today.map((article) => (
                <li
                  key={article} // Sử dụng tên bài viết làm key
                  className={`flex items-center justify-between relative p-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors`}
                  onClick={() => handleArticleClick(article)} // Click vào để chọn bài viết
                >
                  <span>{article}</span>
                  {selectedArticle === article && ( // Chỉ hiển thị nút thùng rác cho bài viết được chọn
                    <IoTrashOutline
                      className="cursor-pointer text-gray-500 hover:text-black"
                      onClick={handleDelete}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* Hôm qua */}
            {articles.yesterday.length > 0 && (
              <>
                <h2 className="font-bold mb-2">Hôm qua</h2>
                <ul className="flex flex-col gap-1 mb-4">
                  {articles.yesterday.map((article) => (
                    <li
                      key={article}
                      className={`flex items-center justify-between relative p-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors`}
                      onClick={() => handleArticleClick(article)} // Click vào để chọn bài viết
                    >
                      <span>{article}</span>
                      {selectedArticle === article && (
                        <IoTrashOutline
                          className="cursor-pointer text-gray-500 hover:text-black"
                          onClick={handleDelete}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* 7 ngày trước đó */}
            {articles.last7Days.length > 0 && (
              <>
                <h2 className="font-bold mb-2">7 ngày trước đó</h2>
                <ul className="flex flex-col gap-1 mb-4">
                  {articles.last7Days.map((article) => (
                    <li
                      key={article}
                      className={`flex items-center justify-between relative p-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors`}
                      onClick={() => handleArticleClick(article)} // Click vào để chọn bài viết
                    >
                      <span>{article}</span>
                      {selectedArticle === article && (
                        <IoTrashOutline
                          className="cursor-pointer text-gray-500 hover:text-black"
                          onClick={handleDelete}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* 30 ngày trước đó */}
            {articles.last30Days.length > 0 && (
              <>
                <h2 className="font-bold mb-2">30 ngày trước đó</h2>
                <ul className="flex flex-col gap-1 mb-4">
                  {articles.last30Days.map((article) => (
                    <li
                      key={article}
                      className={`flex items-center justify-between relative p-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors`}
                      onClick={() => handleArticleClick(article)} // Click vào để chọn bài viết
                    >
                      <span>{article}</span>
                      {selectedArticle === article && (
                        <IoTrashOutline
                          className="cursor-pointer text-gray-500 hover:text-black"
                          onClick={handleDelete}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      {/* Chat Box */}
      <div className="flex flex-col flex-1 justify-between p-6">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg">
          {/* Hiển thị các tin nhắn ở đây */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-4 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 self-end" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 relative w-full">
          <div className="relative w-2/3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ThưởngGPT"
              className="w-full p-4 text-white rounded-3xl bg-gray-800 outline-none pr-10 "
            />
            <button
              onClick={handleSend}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 ${
                input.trim() ? "bg-gray-400" : "bg-gray-500"
              } hover:bg-gray-600`}
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
