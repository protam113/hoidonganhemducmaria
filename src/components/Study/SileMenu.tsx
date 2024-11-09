import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaFileAlt,
  FaBook,
  FaComments,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Link from "next/link"; // Import Link từ next/router
import Lesson from "./Lesson";
import LessonPlan from "./LessonPlan";
import Doc from "./Doc";

const StudyPage = () => {
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const toggleLibrary = () => {
    setIsLibraryOpen((prev) => !prev);
  };

  const feedbacks = [
    { id: 1, content: "Bài giảng rất hữu ích! Cảm ơn giáo viên!" },
    { id: 2, content: "Tư liệu rất phong phú và dễ hiểu." },
    { id: 3, content: "Rất thích chat AI, giúp tôi giải đáp thắc mắc." },
  ];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      setComments((prev) => [...prev, commentInput]);
      setCommentInput(""); // Xóa input sau khi gửi
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          isLibraryOpen ? "w-64" : "w-16"
        } bg-white shadow-md p-4 relative`}
      >
        <button
          className="absolute -right-4 top-4 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-400"
          onClick={toggleLibrary}
        >
          {isLibraryOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        {isLibraryOpen && (
          <>
            <h2 className="text-xl font-bold mb-4">Danh sách thư viện</h2>
            <ul className="space-y-3 cursor-pointer">
              <li className="flex items-center gap-2 text-lg hover:text-yellow-400">
                <FaChalkboardTeacher />
                Bài giảng
              </li>
              <li className="flex items-center gap-2 text-lg hover:text-yellow-400">
                <FaFileAlt />
                Giáo án
              </li>
              <li className="flex items-center gap-2 text-lg hover:text-yellow-400">
                <FaBook />
                Tư liệu
              </li>
              <li className="flex items-center gap-2 text-lg hover:text-yellow-400">
                <Link href="/chatAI" className="flex items-center gap-2">
                  <FaComments />
                  ChatAI
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <h3 className="text-lg font-bold mb-3">Ý kiến mới nhất</h3>
              <ul className="space-y-2">
                {feedbacks.map((feedback) => (
                  <li key={feedback.id} className="text-sm text-gray-700">
                    {feedback.content}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Gõ tên tài liệu hoặc click để chọn theo nhóm..."
            className="flex-1 p-2 border rounded-md"
          />
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-primary-400">
            Tìm kiếm
          </button>
        </div>

        {/* Library Sections - One Column, Three Rows */}
        <div className="flex flex-col space-y-4">
          <Lesson />
          <LessonPlan />
          <Doc />
        </div>

        {/* Comment Section */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-3">Bình luận</h3>
          <form onSubmit={handleCommentSubmit} className="flex mb-4">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Nhập bình luận của bạn..."
              className="flex-1 p-2 border rounded-md"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-primary-400"
            >
              Gửi
            </button>
          </form>
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="text-sm text-gray-700">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default StudyPage;
