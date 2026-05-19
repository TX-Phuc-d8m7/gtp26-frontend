# Foodie Suggest Design System

## Tổng Quan

Foodie Suggest là giao diện AI food assistant cho hệ thống gợi ý món ăn Đà Nẵng. Dark theme hiện tại đi theo hướng **Warm Dark Food Assistant**: nền đen/xám ấm, điểm nhấn cam món ăn, bề mặt glassmorphism nhẹ, ít chrome, tập trung vào cảm giác trò chuyện với một trợ lý ẩm thực thông minh.

Mục tiêu thị giác:

- Tạo cảm giác ấm, sâu và có “vị” ẩm thực, không phải dashboard kỹ thuật.
- Giữ UI tối giản đủ để nội dung chat là trung tâm.
- Dùng cam như gia vị chính, nhưng không phủ cam lên mọi thứ.
- Dùng glass/frosted surfaces để tạo chiều sâu cho chat, card món ăn, composer, dropdown và panel.
- Ưu tiên mobile-first, dễ đọc, tap target rõ, trạng thái hover/focus có phản hồi.

## Nguồn Token Chính

- CSS variables: `src/app/globals.css`
- Color primitives: `src/theme/colors.ts`
- Typography/spacing: `src/theme/resources.ts`
- Radius/shadow/motion: `src/theme/effects.ts`
- Chat implementation style: `src/features/chat/_styles.ts`

## Phong Cách

Tên phong cách: **Warm Dark Glass Food Assistant**

Tính cách:

- Ấm, hiện đại, có chiều sâu.
- Ít viền cứng, ưu tiên bề mặt trong mờ và ánh sáng mềm.
- Không dùng giao diện quá “AI SaaS template”; cần có cảm giác đồ ăn Đà Nẵng qua cam nóng, xanh rau/herb và nền đen ấm.
- Tránh lạm dụng gradient rực; gradient chỉ nên dùng cho CTA chính, icon hero, nút gửi hoặc human message khi cần nhấn.

## Dark Theme Color Palette

### Nền Và Bề Mặt

Dark theme của chat dùng nền đen/xám ấm thay vì đen thuần:

| Role                   | Value     | Ghi chú                          |
| ---------------------- | --------- | -------------------------------- |
| App background         | `#0C0A09` | Đen ấm, nền chính của chat       |
| Background soft        | `#151110` | Dải nền chuyển nhẹ               |
| Surface                | `#1C1917` | Card, composer, dropdown         |
| Surface soft           | `#292524` | Bubble/card nổi hơn              |
| Surface raised         | `#44403C` | Menu, dropdown, chip nổi         |
| Global dark background | `#09090B` | Token global trong `globals.css` |
| Global card            | `#18181B` | Card mặc định                    |

Nền chat không phẳng. App shell dark dùng radial glow cam rất mờ ở góc và linear gradient đen ấm:

```css
radial orange glow + radial orange glow + linear-gradient(#0C0A09, #151110, #0C0A09)
```

### Brand Accent

| Role          | Value                      | Cách dùng                               |
| ------------- | -------------------------- | --------------------------------------- |
| Primary dark  | `#FB923C`                  | Token global `--primary`                |
| Orange        | `#F68B2D`                  | Text/icon accent trong chat             |
| Orange strong | `#F26608`                  | Human bubble dark, emphasis             |
| Food chilli   | `#F97316`                  | Accent cam sáng                         |
| Glow          | `rgba(249, 115, 22, 0.15)` | Glow composer/card, không tăng quá mạnh |

Cam là màu chủ đạo nhưng chỉ nên dùng cho:

- CTA chính.
- Nút gửi.
- Trạng thái active/selected.
- Icon brand.
- Highlight món ăn hoặc keyword quan trọng.
- Viền/focus khi input hoặc card đang active.

Không nên dùng cam cho mọi chip, mọi border, mọi progress bar. Với semantic UI nên dùng màu riêng: xanh cho phù hợp/healthy/location, đỏ cho xóa/lỗi, xanh dương cho insight/trust.

### Text

| Role              | Value                      | Ghi chú                        |
| ----------------- | -------------------------- | ------------------------------ |
| Main text         | `#FFF7ED`                  | Trắng kem, mềm hơn trắng thuần |
| Muted text        | `rgba(255, 247, 237, 0.6)` | Secondary text trong dark      |
| Global foreground | `#FAFAFA`                  | Token global                   |
| Global muted      | `#A1A1AA`                  | Token global                   |

Nguyên tắc:

- Text chính trong dark nên dùng trắng kem hoặc `var(--foreground)`.
- Text phụ dùng `darkFoodChat.muted`, không dùng xám trắng quá sáng.
- Text trên nền cam phải dùng trắng.
- Không dùng text xanh dương sáng trên dark glass trừ khi là insight hoặc link có chủ đích.

### Semantic Colors

| Role                         | Value             | Cách dùng                                            |
| ---------------------------- | ----------------- | ---------------------------------------------------- |
| Success / healthy / location | `#22C55E`         | Progress phù hợp, trạng thái tích cực                |
| Error / delete               | `#EF4444`         | Delete, lỗi                                          |
| Warning / food warmth        | `#FB923C`         | Warning nhẹ, accent                                  |
| Trust / insight              | Blue tone hạn chế | Box “Tại sao lại gợi ý?” nếu cần phân biệt thông tin |

## Typography

Font chính được định nghĩa bằng CSS variables:

- Display: `"Be Vietnam Pro", "Lexend", ui-sans-serif`
- Body: `"Be Vietnam Pro", "Inter", ui-sans-serif`
- Mono: `"JetBrains Mono", "SFMono-Regular", Consolas`

Nguyên tắc typography:

- Heading dùng `var(--font-display)`, weight `700-800`.
- Body dùng `var(--font-body)`, weight `400-600`.
- Không dùng letter-spacing âm.
- Nội dung chat ưu tiên line-height rộng: `1.55-1.7`.
- Label/chip dùng font nhỏ hơn nhưng weight cao: `0.72rem-0.86rem`, `600-800`.
- Tiếng Việt cần khoảng thở tốt, không nén line-height.

## Border Radius

Radius system:

| Token | Value    | Cách dùng              |
| ----- | -------- | ---------------------- |
| sm    | `6px`    | Chip nhỏ, control phụ  |
| md    | `10px`   | Button nhỏ, row item   |
| lg    | `18px`   | Card, dropdown nhỏ     |
| xl    | `24px`   | Panel lớn, prompt card |
| full  | `9999px` | Pill, badge            |

Chat đang dùng radius mềm:

- Header icon: `14px`
- Brand mark: `12px`
- Human bubble: `22px 22px 6px 22px`
- Assistant bubble: `22px 22px 22px 6px`
- Composer: `22px-28px`
- Empty panel/card lớn: khoảng `24px+`

Nguyên tắc:

- Không bo quá tròn mọi thứ. Card chính dùng 18-28px, icon button dùng 12-16px, pill dùng full.
- Message bubble nên có một góc “đuôi” nhỏ để phân biệt vai trò.

## Glassmorphism Và Bề Mặt

Dark theme dùng glassmorphism có kiểm soát:

- `backdropFilter: blur(18px-24px) saturate(1.12-1.2)`
- Background thường là `rgba(surface, 0.4-0.98)` hoặc linear gradient rất nhẹ.
- Border dùng trắng kem opacity thấp: `rgba(255, 247, 237, 0.06-0.28)`.
- Shadow tối dùng `rgba(0, 0, 0, 0.22-0.56)`.

Các bề mặt chính:

- Header: nền đen ấm gần đặc, blur nhẹ, border bottom rất mờ.
- Composer: surface gradient, blur, glow cam nhẹ khi focus.
- Assistant bubble: surface soft trong mờ, border trắng kem mỏng.
- Human bubble dark: cam rất mờ `alpha(orangeStrong, 0.14)` + viền cam 0.34, không glow mạnh.
- Food card dark: kính mờ đậm, viền trắng kem rõ hơn, shadow đen.
- Dropdown/tools panel: surface gần đặc, shadow sâu, border mỏng.

Không nên:

- Dùng nền xám trắng trong dark theme.
- Dùng shadow cam quá sáng quanh mọi nút.
- Dùng blur quá nặng cho text container nhỏ làm giảm readability.

## Layout Chat

Chat screen gồm 4 vùng chính:

1. Header top bar.
2. Thread history sidebar/sheet.
3. Message content area.
4. Sticky composer phía dưới.

Nguyên tắc layout:

- Main content chiếm `100dvh`, tránh scroll toàn trang.
- Message list tự scroll, composer sticky.
- Content max width lấy từ `dimensions.contentMaxWidth`.
- Empty state là panel lớn, có prompt cards và pattern line/map rất subtle.
- Mobile ưu tiên một cột, prompt card cao vừa đủ, composer không che nội dung cuối.

## Header

Header dark theme:

- Background: `alpha(#0C0A09, 0.9)`
- Border bottom: `rgba(255, 247, 237, 0.06)`
- Icon button: 38x38, radius 14px.
- Hover icon: nền cam alpha thấp, icon chuyển cam sáng.

GitHub/theme/account icon phải có hover background nhất quán. Không để icon đen chìm trên nền dark.

## Message Bubbles

### Human Message

Dark theme:

- Không dùng gradient cam rực.
- Background: `alpha(#F26608, 0.14)`
- Border: `alpha(#F26608, 0.34)`
- Text: trắng gần đủ `rgba(255,255,255,0.95)`
- Shadow: hạn chế, chủ yếu inset highlight.

Mục tiêu: người dùng thấy rõ message của mình nhưng không phá tone dark ấm.

### Assistant Message

Dark theme:

- Background: `alpha(surfaceSoft, 0.44)`
- Border: `alpha(#FFF7ED, 0.1)`
- Blur: `20px`
- Text: `var(--foreground)` / trắng kem.
- Avatar AI dùng style glass cùng hệ, icon màu trắng kem/cam nhẹ tùy ngữ cảnh.

Assistant bubble nên trông như bề mặt tư vấn, không như card marketing.

### Disclaimer Notice

Disclaimer nằm trong assistant bubble, trước nội dung trả lời:

- Border: trắng kem opacity thấp.
- Background: gradient surface glass.
- Text: muted trắng kem.
- Icon: cùng màu text, không dùng màu cảnh báo đỏ vì đây là thông tin an toàn, không phải lỗi.

## Food Recommendation Card

Food card là thành phần giàu thông tin trong AI response.

Dark theme nên dùng:

- Card nền frosted glass đậm, không đen phẳng.
- Viền sắc, mỏng, rõ hơn nền.
- Header ảnh/hero có overlay để title đọc tốt.
- Progress phù hợp có thể dùng xanh-lime thay vì cam để tránh lạm dụng brand.
- Badge điểm phù hợp không nhất thiết màu cam; nên dùng xanh/herb hoặc neutral tuỳ semantic.
- Button “quán gần bạn” và “đánh giá gợi ý” nên dùng cùng base style: neutral glass, border rõ, text cùng hệ. Chỉ icon/accent mới phân biệt.

Semantic trong food card:

- Thời gian: cam/broth.
- Số phần/location: xanh/herb.
- Calories/heat: đỏ hoặc hồng nhẹ.
- Difficulty: cam nhẹ hoặc neutral.
- Nutrition chips: protein/carb/fat có màu riêng nhưng phải muted.

## Thread History

Sidebar dark theme:

- Nền: đen ấm/surface, không trắng.
- Text title: trắng kem.
- Preview/time: muted.
- Active thread: cam alpha thấp.
- Hover: cam alpha thấp, không đổi layout.

Action buttons:

- Edit: amber/cam nhẹ, thể hiện hành động chỉnh sửa.
- Delete: đỏ mềm, chỉ rõ hành động nguy hiểm.
- Confirm: xanh success.
- Cancel: neutral.
- Tất cả dùng glass button nhỏ, border mỏng, hover nâng nhẹ `translateY(-1px)`.
- Desktop có thể ẩn action đến khi hover/focus; mobile nên hiện luôn để dễ thao tác.

## Composer

Composer là vùng nhập chính, phải nổi rõ nhưng không nặng:

- Sticky bottom.
- Radius lớn `22-28px`.
- Background surface gradient.
- Border trắng kem opacity thấp.
- Focus: viền cam sáng và glow cam nhẹ.
- Textarea transparent, không border riêng.
- Footer có divider mảnh.
- Send button dùng gradient cam chính, không glow quá mạnh.
- Tools panel mở phía trên composer, z-index cao, không bị prompt cards che.

## Buttons Và Interaction States

Button system:

- Primary/CTA: cam gradient.
- Secondary/neutral: glass/transparent surface.
- Destructive: đỏ muted, không dùng đỏ full trừ hành động xác nhận nguy hiểm.
- Success: xanh muted.

State bắt buộc:

- Hover: đổi nền nhẹ, nâng tối đa `1-2px`.
- Focus-visible: dùng `effects.shadows.focus` hoặc ring cam alpha.
- Active: giảm translate về 0 hoặc giảm opacity nhẹ.
- Disabled: opacity thấp, không hover.

Motion:

- Transition thường `160-200ms ease`.
- Panel/dialog dùng `framer-motion` spring nhẹ.
- Tôn trọng `prefers-reduced-motion`.

## Icons

Icon dùng `lucide-react` hoặc custom SVG hiện có.

Nguyên tắc:

- Icon button dùng kích thước 16-20px.
- Header icon thường 20px.
- Inline metadata icon 14-16px.
- Không dùng emoji làm icon trong UI chính.
- Icon phải nhận màu từ semantic state hoặc `currentColor`.

## Borders Và Shadows

Dark theme:

- Border cấu trúc: `rgba(255, 247, 237, 0.06-0.12)`
- Border active: `#FB923C` hoặc cam alpha.
- Border card cần nổi: có thể tăng tới `rgba(255, 247, 237, 0.28)`.
- Shadow chính: đen sâu `rgba(0,0,0,0.22-0.56)`.
- Glow cam chỉ dùng cho focus/composer/card quan trọng, opacity thấp.

Light theme:

- Border neutral nên ưu tiên xám/trắng, không phải tất cả đều cam.
- Cam dùng ở CTA/focus/selected.
- Nếu dùng glass, phải có border và shadow đủ rõ để không chìm vào nền trắng.

## Accessibility

Yêu cầu tối thiểu:

- Text contrast đạt WCAG AA cho body text.
- Focus-visible luôn nhìn thấy được.
- Tap target tối thiểu khoảng 36-44px cho action chính.
- Không chỉ dùng màu để truyền đạt destructive/success; icon và aria-label phải rõ.
- Placeholder không được quá nhạt.
- Motion phải tôn trọng `prefers-reduced-motion`.
- Mobile 375px không được overlap text hoặc composer.

## Quy Tắc Khi Thêm UI Mới

1. Style bằng MUI `sx` và đặt trong `_styles.ts` theo pattern dự án.
2. Không thêm Tailwind utility class cho style mặc định.
3. Dùng token `colors`, `effects`, `fontWeights`, CSS variables thay vì hard-code lung tung.
4. Nếu cần màu mới, thêm vào semantic token hoặc ghi rõ lý do.
5. Dark theme phải kiểm tra riêng, không chỉ invert từ light theme.
6. Cam là accent, không phải màu cho mọi thành phần.
7. UI mới trong chat phải hợp với glass dark surface, radius mềm, border mảnh và shadow sâu.
8. Với component có ý nghĩa semantic, dùng màu semantic:
   - Delete/error: red.
   - Success/healthy/location: green.
   - Information/trust: blue/neutral.
   - Brand/CTA/active: orange.

## Checklist Trước Khi Merge UI

- Dark theme không xuất hiện nền xám trắng lạc tone.
- Header icon hover nhất quán.
- Composer không che nội dung cuối trên mobile.
- Dropdown/tools panel có z-index đủ cao.
- Food card không lạm dụng cam.
- Button destructive có màu đỏ muted rõ ràng.
- Focus state có thể thấy bằng bàn phím.
- Text tiếng Việt không bị tràn hoặc quá sát.
- Không có Tailwind className mới cho style mặc định.
- `npx tsc --noEmit` pass.
