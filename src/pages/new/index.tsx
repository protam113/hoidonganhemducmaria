"use client";

// import AboutCoverSection from "@/components/AboutUs/Section";
import FeaturedPosts from "@/components/New/FeaturedPosts";
import RecentPosts from "@/components/New/RecentPosts";
import RelatedPosts from "@/components/New/RelatedPosts";

const New = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* <AboutCoverSection /> */}
      <FeaturedPosts />
      <RecentPosts />
      <RelatedPosts />
    </main>
  );
};

export default New;
