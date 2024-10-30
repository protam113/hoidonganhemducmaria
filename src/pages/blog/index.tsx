// src/pages/index.tsx

import Container from "@/components/Blog/container";
import PostList from "@/components/postList";
import Link from "next/link";

const BlogPage = () => {
  return (
    <Container>
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
        <p className="mt-2 text-gray-600">
          Discover the latest insights, articles, and updates.
        </p>
      </div>

      {/* Featured Posts */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <PostList aspect="landscape" preloadImage={true} />
      </div>

      {/* Additional Posts */}
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <PostList aspect="square" />
      </div>

      {/* View All Posts Button */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200 ease-in-out"
        >
          <span>View all Posts</span>
        </Link>
      </div>
    </Container>
  );
};

export default BlogPage;
