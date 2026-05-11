# Food Recommendation System Frontend

Frontend của hệ thống gợi ý món ăn, được xây dựng bằng Next.js App Router, React, TypeScript, MUI `sx`, Radix UI primitives và LangGraph chat UI.

Ứng dụng hiện có các nhóm chức năng chính:

- Chat gợi ý món ăn ở trang chủ `/`.
- Đăng nhập, đăng ký và onboarding sở thích ẩm thực.
- Hồ sơ cá nhân và thiết lập dị ứng, món yêu thích, món không thích.
- Tra cứu món ăn từ danh sách dữ liệu mock, xem chi tiết dinh dưỡng, thành phần và cảnh báo sức khỏe.

## Công nghệ chính

- `Next.js 15` với App Router.
- `React 19`.
- `TypeScript`.
- `MUI` cho style qua prop `sx`.
- `Radix UI` cho primitive như dialog, label, avatar, tooltip.
- `react-hook-form` và `zod` cho form state và validation.
- `LangGraph SDK` cho lớp chat/thread.
- `nuqs` cho query-state trong chat.
- `lucide-react` cho icon.
- `next-themes` cho dark/light theme.

## Cấu trúc thư mục

```txt
src/
  app/                         Next.js routes
  features/                    Feature modules theo pattern của dự án
    auth/
    chat/
    foods/
    profile/
  shared/                      Thành phần dùng chung
    components/
      ui/                      Common UI primitives
      icons/
    hooks/
    lib/
  theme/                       Theme tokens
docs/
  FE_COMPONENT_PATTERN.md      Quy tắc tạo shared UI component
  FE_FEATURE_PATTERN.md        Quy tắc tạo/refactor feature module
```

## Routing hiện tại

| Route         | Component chính                         | Mục đích                              |
| ------------- | --------------------------------------- | ------------------------------------- |
| `/`           | `src/features/chat/page.tsx`            | Giao diện chat chính                  |
| `/login`      | `src/features/auth/login/page.tsx`      | Đăng nhập                             |
| `/signup`     | `src/features/auth/signup/page.tsx`     | Đăng ký                               |
| `/onboarding` | `src/features/auth/onboarding/page.tsx` | Chọn sở thích ăn uống ban đầu         |
| `/profile`    | `src/features/profile/page.tsx`         | Quản lý thông tin cá nhân và sở thích |
| `/search`     | `src/features/foods/search/page.tsx`    | Tra cứu món ăn                        |

Các file trong `src/app/**/page.tsx` chủ yếu đóng vai trò route wrapper và render feature tương ứng.

## Kiến trúc feature module

Feature mới hoặc feature được refactor nên tuân thủ `docs/FE_FEATURE_PATTERN.md`.

Cấu trúc chuẩn:

```txt
src/features/[feature]/
  page.tsx
  _use-[feature].ts
  _interface.ts
  _styles.ts
  index.ts
```

Vai trò từng file:

- `page.tsx`: UI layer. Không chứa business logic dài, không gọi API trực tiếp, ưu tiên dùng shared UI primitives.
- `_use-[feature].ts`: Hook quản lý state, form, submit handler, router handler và logic của feature.
- `_interface.ts`: Type, interface, schema `zod` nếu schema chỉ phục vụ riêng feature đó.
- `_styles.ts`: Style object dạng function nhận `theme: Theme`, dùng qua `sx`.
- `index.ts`: Barrel export cho feature.

Ví dụ dùng style:

```tsx
<Box sx={styles.containerStyles}>
  <Typography as="h1" sx={styles.titleStyles}>
    Title
  </Typography>
</Box>
```

Không dùng pattern `className={styles.xxx}` trong feature page.

## Shared UI components

Shared UI nằm trong `src/shared/components/ui`.

Mỗi component dùng cấu trúc 4 file:

```txt
src/shared/components/ui/[component]/
  page.tsx
  _interface.ts
  _styles.ts
  index.ts
```

Các primitive đáng chú ý:

- `Box`: layout wrapper, hỗ trợ `sx`, `component`, `asChild`.
- `Typography`: text wrapper, hỗ trợ `as`, `sx`.
- `Form`: wrapper cho form, hỗ trợ `sx`.
- `Button`, `Input`, `Label`, `Textarea`, `Switch`.
- `Sheet`, `Tooltip`, `Avatar`, `Card`, `Skeleton`.
- `Image`: wrapper cho ảnh.
- `MultiSelectPills`: chọn nhiều option, dùng trong onboarding và profile.

Một số component vẫn giữ `className` để tương thích với phần code cũ, nhưng feature mới/refactor nên ưu tiên `sx`.

## Logic các feature chính

### Auth

`src/features/auth` quản lý các màn:

- `login`
- `signup`
- `onboarding`

Mỗi màn có hook riêng:

- `useLogin`
- `useSignup`
- `useOnboarding`

Logic hiện tại:

- Dùng `react-hook-form` để quản lý form.
- Dùng `zodResolver` để validate schema trong `_interface.ts`.
- Submit hiện đang mô phỏng async bằng `setTimeout`.
- Sau khi thành công:
  - Login chuyển về `/`.
  - Signup chuyển sang `/onboarding`.
  - Onboarding chuyển về `/`.
- Toast thông báo dùng `react-hot-toast`.

### Profile

`src/features/profile` quản lý form hồ sơ cá nhân.

Logic hiện tại:

- Form có default values cho tên, email, mật khẩu, dị ứng, món yêu thích và món không thích.
- Validation nằm trong `profileSchema`.
- Submit hiện đang mô phỏng async bằng `setTimeout`.
- `handleBack` điều hướng về `/`.
- Sử dụng `MultiSelectPills` để chỉnh danh sách sở thích.

### Foods Search

`src/features/foods/search` quản lý tra cứu món ăn.

Dữ liệu hiện tại nằm trong:

```txt
src/features/foods/data/mock-foods.ts
```

Logic chính trong `useFoodSearch`:

- Quản lý `searchTerm`.
- Quản lý `selectedCategory`.
- Quản lý món đang mở chi tiết `selectedFood`.
- Tạo danh sách category từ `MOCK_FOODS`.
- Lọc món ăn theo tên, mô tả và category.
- `handleBack` sẽ gọi `onClose` nếu search đang mở trong modal/sheet, hoặc điều hướng về `/`.
- Chi tiết món ăn hiển thị bằng `FoodDetailSheet`.

### Chat

`src/features/chat` là UI chat chính ở route `/`.

Thành phần chính:

- `page.tsx`: bọc `ThreadProvider`, `StreamProvider`, `Thread`.
- `providers/thread-provider.tsx`: quản lý danh sách thread.
- `providers/stream-provider.tsx`: cung cấp stream context tương thích với UI chat.
- `components/thread`: UI thread, header, input, message list, markdown rendering.
- `components/thread/header.tsx`: chứa nút mở tra cứu món ăn, theme toggle, menu user, model selector.

Lưu ý trạng thái hiện tại:

- `ThreadProvider.getThreads` đang trả về mock thread.
- `StreamProvider.submit` hiện là no-op để giữ tương thích với consumer cũ.
- Một số helper LangGraph vẫn tồn tại để phục vụ tích hợp thật sau này.
- `getApiKey` đọc key từ `localStorage` với key `lg:chat:apiKey`.

## Theme và styling

Ứng dụng dùng `ThemeProvider` từ `next-themes` trong `src/app/layout.tsx`.

Global CSS nằm ở:

```txt
src/app/globals.css
```

Các biến CSS như `--background`, `--foreground`, `--primary`, `--border`, `--muted` được dùng trong style object MUI `sx`.

Quy tắc hiện tại:

- Feature style viết trong `_styles.ts`.
- Style export theo dạng `xxxStyles(theme: Theme) => ({ ... })`.
- UI gọi bằng `sx={styles.xxxStyles}`.
- Shared UI primitive có thể giữ `className` để tương thích, nhưng feature mới nên dùng `sx`.

## Quy tắc import

Ưu tiên import qua barrel `index.ts` khi làm việc trong cùng feature.

Ví dụ:

```ts
import { styles, useProfile } from ".";
```

Với shared UI:

```ts
import { Button } from "@/shared/components/ui/button/index";
import { Box } from "@/shared/components/ui/box/index";
```

Không dùng các folder re-export thừa như `schemas`, `hooks` hoặc `components` nếu file bên trong chỉ export lại một dòng. Logic/schema/hook nên nằm đúng file theo pattern.

## Scripts

```bash
npm run dev
```

Chạy development server Next.js.

```bash
npm run build:internal
```

Build trực tiếp bằng `next build`.

```bash
npm run build
```

Build qua Turbo filter `web`.

```bash
npm exec tsc -- --noEmit --incremental false
```

Kiểm tra TypeScript.

```bash
npm exec prettier -- --write .
```

Format toàn bộ source.

## Trạng thái dữ liệu và backend

Frontend hiện vẫn có nhiều phần mock:

- Auth submit chưa gọi API thật.
- Profile submit chưa gọi API thật.
- Food search dùng `MOCK_FOODS`.
- Chat thread/stream provider vẫn giữ mock/no-op ở một số điểm.

Khi tích hợp backend thật, nên ưu tiên thêm service/api client riêng, sau đó gọi service từ hook `_use-[feature].ts`, không gọi trực tiếp trong `page.tsx`.

## Tài liệu pattern nội bộ

- `docs/FE_COMPONENT_PATTERN.md`: quy tắc tạo common UI component.
- `docs/FE_FEATURE_PATTERN.md`: quy tắc tạo/refactor feature module.

Khi refactor hoặc thêm code mới, đọc hai file này trước để giữ kiến trúc nhất quán.
