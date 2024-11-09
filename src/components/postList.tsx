import Image from "next/image";
import Link from "next/link";
import { cx } from "@/ultis/all";
import Banner from "@/assets/image/banner.png";

// Dữ liệu mẫu
export const fakePosts = [
  {
    title: "Hướng dẫn sử dụng Next.js",
    slug: { current: "huong-dan-su-dung-next-js" },
    mainImage: {
      src: { Banner },
      alt: "Next.js Thumbnail",
      blurDataURL: "data:image/jpeg;base64,...",
    },
    author: {
      name: "Nguyễn Văn A",
      slug: { current: "nguyen-van-a" },
      image: {
        src: "/images/author-a.jpg",
      },
    },
    categories: [{ name: "Lập trình", slug: { current: "lap-trinh" } }],
    publishedAt: "2024-10-25T10:00:00Z",
    excerpt:
      "Một bài viết chi tiết về cách sử dụng Next.js trong dự án của bạn.",
  },
  {
    title: "Tìm hiểu về React",
    slug: { current: "tim-hieu-ve-react" },
    mainImage: {
      src: "/images/react-thumbnail.jpg",
      alt: "React Thumbnail",
      blurDataURL: "data:image/jpeg;base64,...",
    },
    author: {
      name: "Trần Thị B",
      slug: { current: "tran-thi-b" },
      image: {
        src: "/images/author-b.jpg",
      },
    },
    categories: [{ name: "Lập trình", slug: { current: "lap-trinh" } }],
    publishedAt: "2024-10-24T09:00:00Z",
    excerpt:
      "Khám phá những tính năng nổi bật của React trong phát triển ứng dụng.",
  },
  // Bạn có thể thêm nhiều bài viết giả định khác nếu cần
];

export default function PostList({
  aspect = "square",
  minimal = false,
  pathPrefix = "",
  preloadImage = false,
  fontSize = "normal",
  fontWeight = "normal",
}) {
  return (
    <>
      {fakePosts.map((post) => {
        const imageProps = post.mainImage ? post.mainImage : null;
        const authorImageProps = post.author.image ? post.author.image : null;

        return (
          <div
            key={post.slug.current}
            className={cx(
              "group cursor-pointer",
              minimal && "grid gap-10 md:grid-cols-2"
            )}
          >
            <div
              className={cx(
                "overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800"
              )}
            >
              <Link
                className={cx(
                  "relative block",
                  aspect === "landscape"
                    ? "aspect-video"
                    : aspect === "custom"
                    ? "aspect-[5/4]"
                    : "aspect-square"
                )}
                href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                  post.slug.current
                }`}
              >
                {imageProps ? (
                  <Image
                    src={Banner}
                    {...(imageProps.blurDataURL && {
                      placeholder: "blur",
                      blurDataURL: imageProps.blurDataURL,
                    })}
                    alt={imageProps.alt || "Thumbnail"}
                    priority={preloadImage}
                    className="object-cover transition-all"
                    fill
                    sizes="(max-width: 768px) 30vw, 33vw"
                  />
                ) : (
                  <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                    {/* Icon or Placeholder */}
                    Test
                  </span>
                )}
              </Link>
            </div>
            <div className={cx(minimal && "flex items-center")}>
              <div>
                {/* Hiển thị các danh mục thành 3 cột */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {post.categories.map((category) => (
                    <Link
                      key={category.slug.current}
                      href={`/category/${category.slug.current}`}
                    >
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <h2
                  className={cx(
                    fontSize === "large"
                      ? "text-2xl"
                      : minimal
                      ? "text-3xl"
                      : "text-lg",
                    fontWeight === "normal"
                      ? "line-clamp-2 font-medium tracking-normal text-black"
                      : "font-semibold leading-snug tracking-tight",
                    "mt-2 "
                  )}
                >
                  <Link
                    href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                      post.slug.current
                    }`}
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="hidden">
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-black ">
                      <Link
                        href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                          post.slug.current
                        }`}
                      >
                        {post.excerpt}
                      </Link>
                    </p>
                  )}
                </div>
                <div className="mt-3 flex items-center space-x-3 text-gray-500 ">
                  <Link href={`/author/${post.author.slug.current}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative h-5 w-5 flex-shrink-0">
                        {authorImageProps && (
                          <Image
                            src={authorImageProps.src}
                            alt={post.author.name}
                            className="rounded-full object-cover"
                            fill
                            sizes="20px"
                          />
                        )}
                      </div>
                      <span className="truncate text-sm">
                        {post.author.name}
                      </span>
                    </div>
                  </Link>
                  <span className="text-xs text-black ">&bull;</span>
                  <time
                    className="truncate text-sm"
                    dateTime={post.publishedAt}
                  >
                    24/12/2024
                  </time>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
