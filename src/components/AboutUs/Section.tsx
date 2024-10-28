import Image from "next/image";
import Link from "next/link";
import React from "react";
// import Tag from '../Elements/Tag';
import Banner from "@/assets/image/banner.png";

const AboutCoverSection = () => {
  // const sortedBlogs = sortBlogs(blogs);
  // const blog = sortedBlogs[0];
  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-8 mt-4 relative h-[40vh] sm:h-[60vh]">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
            "
        />
        <Image
          src={Banner}
          placeholder="blur"
          // blurDataURL={blog.image.blurhashDataUrl}
          alt="Banner"
          fill
          className="w-full h-full object-center object-cover rounded-3xl -z-10"
          sizes="100vw"
          priority
        />

        <div className="bg-white lg:w-full sm:p-8 md:p-12  lg:p-1 flex flex-col items-start justify-center z-0 text-light">
          {/*<Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />*/}
          <Link href="/" className="mt-6">
            <h1 className="font-bold capitalize text-16 sm:text-18 md:text-20 lg:text-22">
              <span
                className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
              >
                {/*{blog.title}*/}
                Dòng Đa Minh có 3 tân Hồng y:
              </span>
            </h1>
          </Link>
          <p className="hidden  sm:inline-block mt-4 md:text-14 lg:text-16 font-in">
            {/*{blog.description}*/}
            Dòng Đa Minh có 3 tân Hồng y: Cha Timothy Radcliffe cùng với Tổng
            Giám mục Jean-Paul Vesco, và Tổng Giám mục Francis Leo sẽ được phong
            Hồng y
          </p>
        </div>
      </article>
    </div>
  );
};

export default AboutCoverSection;
