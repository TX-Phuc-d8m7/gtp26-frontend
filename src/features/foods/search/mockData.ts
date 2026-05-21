/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export interface FoodLocation {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface SearchFood {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  soft_tags: string[];
  locations: FoodLocation[];
  image: string;
  priceRange: string;
  signature: string;
  healthNote: string;
}

export const SEARCH_FOODS: SearchFood[] = [
  {
    id: "mi-quang",
    name: "Mì Quảng",
    description:
      "Món mì vàng đặc trưng miền Trung, nước lèo đậm nhưng ít, ăn cùng rau sống, bánh tráng và đậu phộng.",
    ingredients: [
      "Mì Quảng",
      "tôm",
      "thịt heo",
      "trứng cút",
      "đậu phộng",
      "bánh tráng",
      "rau sống",
    ],
    soft_tags: ["đặc sản", "bữa trưa", "đậm vị", "có đậu phộng", "món khô"],
    locations: [
      {
        name: "Mì Quảng Bà Mua",
        address: "19 Trần Bình Trọng, Hải Châu, Đà Nẵng",
        lat: 16.06668,
        lng: 108.21948,
      },
      {
        name: "Mì Quảng Ếch Bếp Trang",
        address: "441 Ông Ích Khiêm, Hải Châu, Đà Nẵng",
        lat: 16.06718,
        lng: 108.21229,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900",
    priceRange: "30.000đ - 60.000đ",
    signature: "Nên thử bản tôm thịt hoặc mì Quảng ếch nếu thích vị đậm.",
    healthNote: "Có đậu phộng và hải sản; người dị ứng nên hỏi trước khi gọi.",
  },
  {
    id: "bun-cha-ca",
    name: "Bún chả cá",
    description:
      "Bún nước thanh ngọt, chả cá dai, cà chua, bí đỏ và rau sống; hợp cho bữa sáng hoặc bữa nhẹ.",
    ingredients: [
      "bún",
      "chả cá",
      "xương cá",
      "bí đỏ",
      "cà chua",
      "bắp cải",
      "hành ngò",
    ],
    soft_tags: ["bữa sáng", "món nước", "ít dầu", "hải sản", "dễ ăn"],
    locations: [
      {
        name: "Bún chả cá Bà Lữ",
        address: "319 Hùng Vương, Hải Châu, Đà Nẵng",
        lat: 16.06846,
        lng: 108.21982,
      },
      {
        name: "Bún chả cá Hờn",
        address: "113/3 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng",
        lat: 16.07124,
        lng: 108.22097,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cb431?auto=format&fit=crop&q=80&w=900",
    priceRange: "25.000đ - 45.000đ",
    signature: "Gọi tô chả cá chiên hấp trộn nếu muốn nhiều texture.",
    healthNote: "Người cần ăn nhạt nên dặn giảm mắm ruốc hoặc ít nước mắm.",
  },
  {
    id: "banh-xeo",
    name: "Bánh xèo tôm nhảy",
    description:
      "Bánh xèo miền Trung nhỏ, vỏ giòn, nhân tôm thịt, cuốn bánh tráng rau sống và chấm nước mắm hoặc tương đậu.",
    ingredients: [
      "bột gạo",
      "tôm",
      "thịt ba chỉ",
      "giá đỗ",
      "rau sống",
      "bánh tráng",
      "nước chấm",
    ],
    soft_tags: ["ăn nhóm", "món chiên", "giòn", "hải sản", "nhiều dầu"],
    locations: [
      {
        name: "Bánh xèo Bà Dưỡng",
        address: "K280/23 Hoàng Diệu, Hải Châu, Đà Nẵng",
        lat: 16.06094,
        lng: 108.21673,
      },
      {
        name: "Bánh xèo Cô Mười",
        address: "23 Châu Thị Vĩnh Tế, Ngũ Hành Sơn, Đà Nẵng",
        lat: 16.04745,
        lng: 108.2411,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1626804475297-4160ebbaea4b?auto=format&fit=crop&q=80&w=900",
    priceRange: "40.000đ - 90.000đ",
    signature: "Ăn ngon nhất khi cuốn nóng với rau cải và nước chấm đậm.",
    healthNote: "Không hợp nếu đang cần hạn chế dầu mỡ hoặc dị ứng hải sản.",
  },
  {
    id: "banh-trang-cuon-thit-heo",
    name: "Bánh tráng cuốn thịt heo",
    description:
      "Thịt heo luộc hai đầu da, rau sống đa dạng, cuốn bánh tráng và chấm mắm nêm thơm nồng.",
    ingredients: [
      "thịt heo",
      "bánh tráng",
      "rau sống",
      "chuối chát",
      "khế",
      "dưa leo",
      "mắm nêm",
    ],
    soft_tags: ["ăn nhóm", "nhiều rau", "đặc sản", "món cuốn", "ít dầu"],
    locations: [
      {
        name: "Trần Đà Nẵng",
        address: "04 Lê Duẩn, Hải Châu, Đà Nẵng",
        lat: 16.07364,
        lng: 108.22244,
      },
      {
        name: "Mậu Quán",
        address: "35 Đỗ Thúc Tịnh, Cẩm Lệ, Đà Nẵng",
        lat: 16.03783,
        lng: 108.19925,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=900",
    priceRange: "80.000đ - 180.000đ",
    signature: "Điểm hay nằm ở rau tươi và mắm nêm pha vừa miệng.",
    healthNote: "Mắm nêm khá mặn; người cao huyết áp nên dùng ít.",
  },
  {
    id: "goi-ca-nam-o",
    name: "Gỏi cá Nam Ô",
    description:
      "Gỏi cá trích tươi trộn thính, rau rừng và nước chấm đặc trưng; vị mạnh, hợp người thích hải sản sống.",
    ingredients: [
      "cá trích",
      "thính",
      "đậu phộng",
      "rau rừng",
      "bánh tráng",
      "nước chấm mè",
    ],
    soft_tags: ["hải sản", "món sống", "đặc sản", "vị mạnh", "ăn trải nghiệm"],
    locations: [
      {
        name: "Gỏi cá Thanh Hương",
        address: "1029 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng",
        lat: 16.11357,
        lng: 108.13689,
      },
      {
        name: "Gỏi cá Cô Hồng",
        address: "118 Huỳnh Thúc Kháng, Hải Châu, Đà Nẵng",
        lat: 16.06457,
        lng: 108.21906,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=900",
    priceRange: "90.000đ - 180.000đ",
    signature: "Nên gọi phần nhỏ nếu lần đầu ăn cá sống.",
    healthNote: "Không phù hợp cho phụ nữ mang thai, trẻ nhỏ hoặc bụng yếu.",
  },
  {
    id: "banh-mi-da-nang",
    name: "Bánh mì Đà Nẵng",
    description:
      "Ổ bánh mì nóng giòn, nhân pate, chả, trứng, thịt nguội hoặc heo quay; nhanh, rẻ, hợp mọi thời điểm.",
    ingredients: [
      "bánh mì",
      "pate",
      "chả",
      "trứng",
      "dưa leo",
      "đồ chua",
      "rau thơm",
    ],
    soft_tags: ["ăn nhanh", "bữa sáng", "giá rẻ", "mang đi", "dễ ăn"],
    locations: [
      {
        name: "Bánh mì Đồng Tiến",
        address: "75 Phan Đăng Lưu, Hải Châu, Đà Nẵng",
        lat: 16.04716,
        lng: 108.21991,
      },
      {
        name: "Bánh mì Cô Tiên",
        address: "80 Trưng Nữ Vương, Hải Châu, Đà Nẵng",
        lat: 16.06076,
        lng: 108.22055,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1603046891744-1f76eb10aec4?auto=format&fit=crop&q=80&w=900",
    priceRange: "15.000đ - 35.000đ",
    signature:
      "Hợp để gợi ý khi người dùng muốn món nhanh gần vị trí hiện tại.",
    healthNote: "Có gluten và pate; người ăn kiêng nên chọn ít sốt.",
  },
  {
    id: "che-sau-rieng",
    name: "Chè sầu riêng",
    description:
      "Món tráng miệng nổi tiếng với sầu riêng, thạch, mít, nước cốt dừa và đá bào; ngọt béo, rất hợp buổi tối.",
    ingredients: [
      "sầu riêng",
      "mít",
      "thạch",
      "đậu xanh",
      "nước cốt dừa",
      "sữa",
      "đá bào",
    ],
    soft_tags: ["tráng miệng", "ngọt", "ăn tối", "mát lạnh", "béo"],
    locations: [
      {
        name: "Chè Liên",
        address: "189 Hoàng Diệu, Hải Châu, Đà Nẵng",
        lat: 16.0605,
        lng: 108.2174,
      },
      {
        name: "Chè Xuân Trang",
        address: "31 Lê Duẩn, Hải Châu, Đà Nẵng",
        lat: 16.07326,
        lng: 108.22367,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=900",
    priceRange: "25.000đ - 45.000đ",
    signature: "Gợi ý tốt khi người dùng hỏi món ngọt hoặc ăn khuya nhẹ.",
    healthNote: "Khá ngọt và béo; người tiểu đường nên hạn chế.",
  },
];
