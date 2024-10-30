import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import "react-calendar/dist/Calendar.css"; // Import CSS của react-calendar
import slide1 from "@/assets/image/slide1.png";

// Đảm bảo các đường dẫn này chính xác
const images = [slide1];

export const Prayer = () => {
  return (
    <article className="container mx-auto" style={{ width: "1400px" }}>
      {/* Header Section */}

      {/* Main Content Section: Text and Slideshow */}
      <div className="flex items-center justify-between  gap-8">
        <div>
          <header
            className="bg-primary-500 py-3 rounded-lg w-max"
            style={{ width: "880px" }}
          >
            <h2 className="text-white font-semibold pl-4">
              5 Phút Lời Chúa Mỗi Ngày
            </h2>
          </header>

          <p className="mt-4 text-sm">
            Đức Giê-su liền gọi một em nhỏ đến, đặt vào giữa các ông, và bảo:
            “Thầy bảo thật anh em: nếu anh em không trở lại mà nên như trẻ em,
            thì sẽ chẳng vào được Nước Trời. Vậy ai tự hạ và nên như em nhỏ này,
            người ấy sẽ là người lớn nhất Nước Trời.” (Mt 18,2-4) Suy niệm: Lần
            theo ánh sáng của đoạn Tin Mừng này, thánh Tê-rê-xa Hài Đồng đã sống
            và vạch ra linh đạo “Thơ Ấu Thiêng Liêng” làm con đường nên thánh
            cho biết bao nhiêu tâm hồn. <br></br>– Trước tiên, Người khiêm tốn
            nhận mình nhỏ bé: “Các vị thánh như những ngọn núi cao chót vót tận
            ngàn mây xanh, còn con như hạt cát ti tiện nằm dưới chân khách bộ
            hành, nhỏ bé không thể leo lên những bậc thang cao của bậc hoàn
            thiện được”. Người  tìm kiếm chiếc thang máy đưa mình lên, và thánh
            nhân đã khám phá ra chiếc thang máy đó là chính Chúa Giê-su: “Lạy
            Chúa Giê-su, chiếc thang máy nâng con lên tới...{" "}
            <button className="text-black font-semibold">Xem Thêm</button>
          </p>
        </div>

        {/* Slideshow Section */}
        <div className="w-80 ">
          <Slide
            easing="ease"
            duration={3000}
            transitionDuration={500}
            autoplay={true}
            infinite={true}
            arrows={false}
          >
            {images.map((image, index) => (
              <div className="each-slide" key={index}>
                <Image
                  src={image}
                  alt={`slide-${index}`}
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </article>
  );
};
