import { MdGroups } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";

export const NavItems = () => {
  return [
    {
      key: 1,
      label: "Trang Chủ",
      link: "/",
      // children: [
      //   {
      //     id: 13,
      //     label: "Giới Thiệu",
      //     link: "/hoi_dong/about_us",
      //     icon: MdGroups,
      //   },
      // ],
    },
    {
      key: 2,
      label: "Tin Tức",
      link: "/new",
    },
    {
      key: 10,
      label: "Bài Viết",
      link: "/blog",
    },
    {
      id: 3,
      label: "Hội Dòng",
      link: "/hoidong",
      children: [
        {
          id: 9,
          label: "Ơn Gọi",
          link: "/hoidong/on_goi",
          icon: MdOutlineEventNote,
        },
        {
          id: 11,
          label: "Sứ Vụ",
          link: "/hoidong/su_vu",
          icon: MdOutlineEventNote,
        },
      ],
    },
    {
      id: 4,
      label: "Hoạt Động",
      link: "/activity",
      children: [
        {
          id: 12,
          label: "Học Hỏi Kinh Thánh (AI)",
          link: "/hoi_dong/about_us",
          icon: MdGroups,
        },
      ],
    },
    {
      id: 6,
      label: "Quyên Góp",
      link: "/donation",
    },
    {
      id: 15,
      label: "Học Tập",
      link: "/study",
    },
    {
      id: 13,
      // label: "Login",
      link: "/login",
    },
    {
      id: 14,
      // label: "Register",
      link: "/register",
    },
  ];
};
