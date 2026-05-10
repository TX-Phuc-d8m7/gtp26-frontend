export interface Food {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergies?: string[];
  medicalAdvice?: string;
  priceRange: string;
}

export const MOCK_FOODS: Food[] = [
  {
    id: "f1",
    name: "Mì Quảng",
    description:
      "Món ăn đặc sản trứ danh của Quảng Nam - Đà Nẵng với sợi mì vàng ươm, nước lèo đậm đà vừa đủ thấm, ăn kèm rau sống tươi ngon.",
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800",
    categories: ["Món nước", "Đặc sản", "Bữa chính"],
    ingredients: [
      "Sợi mì Quảng",
      "Thịt heo",
      "Tôm",
      "Trứng cút",
      "Bánh tráng nướng",
      "Đậu phộng",
      "Rau sống",
    ],
    nutrition: { calories: 450, protein: 25, carbs: 55, fat: 15 },
    allergies: ["Đậu phộng", "Hải sản", "Trứng"],
    medicalAdvice: "Người bệnh gút nên hạn chế nước lèo và tôm thịt nhiều.",
    priceRange: "30.000đ - 55.000đ",
  },
  {
    id: "f2",
    name: "Bún Chả Cá",
    description:
      "Bún chả cá Đà Nẵng nổi bật với nước dùng thanh ngọt nấu từ xương cá, bí đỏ, bắp cải, ăn cùng chả cá chiên và hấp dai giòn.",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cb431?auto=format&fit=crop&q=80&w=800",
    categories: ["Món nước", "Đặc sản", "Bữa sáng"],
    ingredients: [
      "Bún tươi",
      "Chả cá",
      "Bí đỏ",
      "Bắp cải",
      "Cà chua",
      "Hành ngò",
    ],
    nutrition: { calories: 380, protein: 20, carbs: 60, fat: 8 },
    allergies: ["Hải sản"],
    medicalAdvice:
      "Nước dùng khá an toàn, tuy nhiên người cao huyết áp nên yêu cầu ít muối.",
    priceRange: "25.000đ - 45.000đ",
  },
  {
    id: "f3",
    name: "Bánh Xèo tôm nhảy",
    description:
      "Bánh xèo miền Trung vỏ mỏng giòn rụm, nhân tôm đất tươi rói, cuốn với bánh tráng và rau sống, chấm nước mắm chua ngọt hoặc tương đậu.",
    image:
      "https://images.unsplash.com/photo-1626804475297-4160ebbaea4b?auto=format&fit=crop&q=80&w=800",
    categories: ["Món chiên", "Ăn chơi", "Bữa tối"],
    ingredients: [
      "Bột gạo",
      "Tôm đất",
      "Giá đỗ",
      "Thịt ba chỉ",
      "Bánh tráng",
      "Rau sống",
      "Nước mắm",
    ],
    nutrition: { calories: 520, protein: 18, carbs: 45, fat: 28 },
    allergies: ["Hải sản", "Gluten (nếu dùng xì dầu)"],
    medicalAdvice:
      "Chứa nhiều dầu mỡ, không tốt cho người đang giảm cân hoặc có bệnh mỡ máu.",
    priceRange: "40.000đ - 80.000đ",
  },
  {
    id: "f4",
    name: "Bê thui Cầu Mống",
    description:
      "Bê thui nguyên con bằng rơm cho da vàng ươm giòn rụm, thịt bên trong chín tái hồng đào. Cuốn rau sống chấm mắm nêm cực phẩm.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800",
    categories: ["Món cuốn", "Đặc sản", "Nhậu"],
    ingredients: [
      "Thịt bê thui",
      "Bánh tráng",
      "Khế chua",
      "Chuối chát",
      "Rau thơm",
      "Mắm nêm",
    ],
    nutrition: { calories: 320, protein: 35, carbs: 20, fat: 12 },
    allergies: ["Đậu nành (mắm nêm)"],
    medicalAdvice:
      "Mắm nêm có thể không phù hợp với người có hệ tiêu hóa yếu hoặc dị ứng hải sản lên men.",
    priceRange: "150.000đ - 300.000đ",
  },
  {
    id: "f5",
    name: "Tré Đà Nẵng",
    description:
      "Món ăn chơi làm từ tai heo, thịt đầu heo, riềng, tỏi, mè, bọc trong lá chuối. Vị chua chua, giòn sực sực rất hấp dẫn.",
    image:
      "https://images.unsplash.com/photo-1600850056064-a8b380df8395?auto=format&fit=crop&q=80&w=800",
    categories: ["Ăn vặt", "Đặc sản", "Mua về"],
    ingredients: [
      "Tai heo",
      "Thịt đầu heo",
      "Riềng",
      "Tỏi",
      "Mè",
      "Lá ổi",
      "Lá chuối",
    ],
    nutrition: { calories: 250, protein: 15, carbs: 5, fat: 18 },
    allergies: ["Mè"],
    medicalAdvice:
      "Thịt lên men chua, người bị dạ dày nên ăn ở mức độ vừa phải.",
    priceRange: "80.000đ - 120.000đ",
  },
  {
    id: "f6",
    name: "Gỏi cá Nam Ô",
    description:
      "Gỏi cá trứ danh vùng Nam Ô làm từ cá trích tươi sống, ướp với gia vị đặc trưng và thính. Cuốn bánh tráng với rau rừng mọc ven suối.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    categories: ["Món sống", "Đặc sản", "Hải sản"],
    ingredients: [
      "Cá trích tươi",
      "Thính",
      "Đậu phộng",
      "Bánh tráng",
      "Rau rừng",
      "Nước chấm mè đậu phộng",
    ],
    nutrition: { calories: 280, protein: 22, carbs: 15, fat: 14 },
    allergies: ["Hải sản", "Đậu phộng"],
    medicalAdvice:
      "Cá sống không phù hợp cho phụ nữ có thai, trẻ nhỏ hoặc người có bụng dạ yếu.",
    priceRange: "80.000đ - 150.000đ",
  },
];
