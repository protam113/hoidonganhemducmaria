import Link from "next/link";
import Label from "@/components/ui/label";

export default function CategoryLabel({ categories = [], nomargin = false }) {
  // Dữ liệu mẫu cho categories
  const sampleCategories = [
    { slug: { current: "category-1" }, title: "Thể loại 1", color: "blue" },
    { slug: { current: "category-2" }, title: "Thể loại 2", color: "red" },
    { slug: { current: "category-3" }, title: "Thể loại 3", color: "green" },
    { slug: { current: "category-4" }, title: "Thể loại 4", color: "yellow" },
  ];

  // Sử dụng dữ liệu mẫu nếu không có categories được truyền vào
  const categoriesToDisplay = categories.length ? categories : sampleCategories;

  return (
    <div className="flex gap-3">
      {categoriesToDisplay.map((category, index) => (
        <Link href={`/category/${category.slug.current}`} key={index}>
          <Label nomargin={nomargin} color={"blue"}>
            {category.title}
          </Label>
        </Link>
      ))}
    </div>
  );
}
