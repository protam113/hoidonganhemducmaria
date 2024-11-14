

### **a. Tính các giá trị Mean, Median, Mode, Midrange, Five-number Summary cho các thuộc tính `age`, `height` và `weight`**

#### **1. Age**
- **Mean** (Trung bình cộng): Tính tổng tất cả các giá trị của `age` và chia cho số lượng vận động viên.
- **Median** (Trung vị): Sắp xếp các giá trị theo thứ tự tăng dần, chọn giá trị ở giữa.
- **Mode** (Giá trị xuất hiện nhiều nhất): Giá trị nào xuất hiện nhiều nhất trong dãy.
- **Midrange** (Trung bình của giá trị lớn nhất và nhỏ nhất): \(\text{Midrange} = \frac{\text{Min} + \text{Max}}{2}\)
- **Five-number Summary**: Gồm:
  - **Minimum**: Giá trị nhỏ nhất.
  - **Q1**: Phân vị thứ nhất (25%).
  - **Median**: Trung vị (phân vị thứ hai, 50%).
  - **Q3**: Phân vị thứ ba (75%).
  - **Maximum**: Giá trị lớn nhất.

**Kết quả cho `age`**:
- Mean: \( \frac{16 + 53 + 16 + 16 + 17 + 17 + 17 + 16 + 17 + 17 + 17 + 17 + 52 + 46 + 53 + 52 + 16 + 16 + 17 + 18 + 19}{21} \approx 26.86 \)
- Median: 17
- Mode: 17 (xuất hiện 8 lần)
- Midrange: \( \frac{16 + 53}{2} = 34.5 \)
- Five-number Summary: Min = 16, Q1 = 16, Median = 17, Q3 = 52, Max = 53

#### **2. Height**
**Kết quả cho `height`**:
- Mean: \( \frac{1.58 + 1.68 + 1.53 + 1.66 + 1.61 + 1.76 + 1.83 + 1.51 + 1.88 + 1.42 + 1.77 + 1.68 + 1.7 + 1.74 + 1.73 + 1.59 + 1.6 + 1.34 + 1.6 + 1.67 + 1.81}{21} \approx 1.66 \)
- Median: 1.68
- Mode: Không có giá trị nào xuất hiện nhiều hơn 1 lần.
- Midrange: \( \frac{1.34 + 1.88}{2} = 1.61 \)
- Five-number Summary: Min = 1.34, Q1 = 1.6, Median = 1.68, Q3 = 1.76, Max = 1.88

#### **3. Weight**
**Kết quả cho `weight`**:
- Mean: \( \frac{65 + 68 + 48 + 51 + 43 + 59 + 78 + 44 + 72 + 35 + 59 + 59 + 65 + 80 + 63 + 57 + 50 + 37 + 51 + 55 + 71}{21} \approx 57.57 \)
- Median: 57
- Mode: 59 (xuất hiện 3 lần)
- Midrange: \( \frac{35 + 80}{2} = 57.5 \)
- Five-number Summary: Min = 35, Q1 = 51, Median = 57, Q3 = 65, Max = 80

### **b. Vẽ đồ thị scatter dựa trên 2 thuộc tính `height` và `age` của cả 3 nước trên cùng 1 đồ thị**

- Ta sẽ tạo một biểu đồ scatter (biểu đồ phân tán) với trục X là `height` và trục Y là `age`. Mỗi điểm trên đồ thị sẽ đại diện cho một vận động viên.
- Dữ liệu sẽ được phân biệt dựa trên `nationality` (USA, RUS, FRA) để dễ dàng so sánh.

### **c. Vẽ đồ thị boxplot dựa trên thuộc tính `weight` của cả 3 nước trên cùng 1 đồ thị**

- Đồ thị boxplot sẽ giúp so sánh phân phối cân nặng (`weight`) của vận động viên từ 3 nước.
- Trục Y sẽ là `weight`, và mỗi quốc gia sẽ có một box riêng biệt.

### **d. Đo lường sự tương đồng giữa 3 vận động viên tiêu biểu của mỗi nước (`id`: 3, 8, 15)**

- Các vận động viên có `id` 3 (USA), 8 (RUS), và 15 (FRA).
- Ta sẽ sử dụng **khoảng cách Euclidean** để đo lường sự tương đồng dựa trên các thuộc tính: `height`, `weight`, và `age`.

**Công thức tính khoảng cách Euclidean giữa hai điểm A và B**:
\[
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}
\]
Trong đó:
- \((x_1, y_1, z_1)\) là giá trị của vận động viên A.
- \((x_2, y_2, z_2)\) là giá trị của vận động viên B.

**Kết quả**:
1. Khoảng cách giữa vận động viên 3 (USA) và 8 (RUS).
2. Khoảng cách giữa vận động viên 3 (USA) và 15 (FRA).
3. Khoảng cách giữa vận động viên 8 (RUS) và 15 (FRA).

