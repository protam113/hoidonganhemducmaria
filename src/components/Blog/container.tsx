import { cx } from "@/ultis/all";
import React, { ReactNode } from "react";

// Định nghĩa kiểu cho props
interface ContainerProps {
  large?: boolean; // Thuộc tính này là tùy chọn
  alt?: boolean; // Thuộc tính này là tùy chọn
  className?: string; // Thuộc tính này là tùy chọn
  children: ReactNode; // Kiểu cho children
}

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div
      className={cx(
        "container px-8 mx-auto xl:px-5",
        props.large ? "max-w-screen-xl" : "max-w-screen-lg",
        !props.alt && "py-5 lg:py-8",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Container;
