import { Message } from "@langchain/langgraph-sdk";

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    type: "human",
    content: "Tôi muốn ăn cơm chiên. Bạn có gợi ý nào không?",
  },
  {
    id: "msg-2",
    type: "ai",
    content:
      "Tôi rất vui được giúp bạn! Cơm chiên là một món ăn tuyệt vời. Dưới đây là một số gợi ý:\n\n1. **Cơm chiên tôm** - Thêm tôm tươi, trứng, và hành hoa\n2. **Cơm chiên gà** - Gà xay hoặc gà cắt nhỏ, rau cải, hành\n3. **Cơm chiên dịa thập cẩm** - Tôm, gà, thịt lợn, trứng, rau cải\n4. **Cơm chiên trứng** - Đơn giản nhưng ngon, trứng gà, hành hoa, nước mắm\n\nBạn muốn thử món nào?",
  },
  {
    id: "msg-3",
    type: "human",
    content: "Cơm chiên tôm nghe hay. Bạn có thể cho tôi công thức không?",
  },
  {
    id: "msg-4",
    type: "ai",
    content:
      "Chắc chắn rồi! Dưới đây là công thức cơm chiên tôm đơn giản:\n\n## Nguyên liệu:\n- 2 cup cơm nguội\n- 200g tôm tươi, bóc vỏ\n- 2 quả trứng gà\n- 1/2 cốc hành hoa\n- 3 thìa sốt cà chua\n- 2 thìa nước mắm\n- 2 thìa dầu ăn\n- Tiêu đen, muối vừa\n\n## Hướng dẫn:\n1. Đun nóng dầu ăn trong chảo to\n2. Phi tôm tới khi chín, bỏ ra\n3. Đánh trứng vào chảo, khuấy tơi, bỏ ra\n4. Cho cơm vào chảo, xào 2-3 phút\n5. Thêm sốt cà chua, nước mắm, khuấy đều\n6. Cho tôm và trứng trở lại, trộn đều\n7. Nêm nếm gia vị theo thích, rắc hành hoa lên trên\n\nVoilà! Xong rồi!",
  },
  {
    id: "msg-5",
    type: "human",
    content: "Cảm ơn! Tôi sẽ thử nấu theo công thức này.",
  },
  {
    id: "msg-6",
    type: "ai",
    content:
      "Rất vui được giúp bạn! 😊 Chúc bạn nấu ăn vui vẻ và thành công. Nếu có bất kỳ câu hỏi nào khác hoặc cần gợi ý thêm về các món ăn khác, hãy liên hệ tôi nhé!\n\nChúc bạn ăn ngon! 🍚",
  },
];
