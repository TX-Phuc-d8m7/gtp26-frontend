Hãy đóng vai là một Senior Next.js Developer. Nhiệm vụ của bạn là tạo hoặc refactor một Feature Module tên là: [ĐIỀN_TÊN_FEATURE_VÀO_ĐÂY, ví dụ: Profile, FoodSearch, RestaurantSearch...]

Yêu cầu BẮT BUỘC: Bạn phải tuân thủ chặt chẽ kiến trúc tách biệt Logic và UI. Feature Module dùng cùng tinh thần chia file với `FE_COMPONENT_PATTERN.md`, chỉ khác là có thêm file `_use-[feature].ts` để quản lý state và business logic.

Mọi file được tạo ra đều phải có header bản quyền sau ở dòng đầu tiên:

```ts
/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
```

1. Cấu trúc thư mục feature

Tạo trong thư mục của feature, ví dụ `src/features/profile/`:

- `page.tsx`: Chứa UI chính của Feature.
  - File này là UI layer, không chứa business logic, fetch data, submit data, xử lý URL phức tạp, hoặc validate schema trực tiếp.
  - Gọi custom hook ở đầu component: `const { state, isLoading, handler } = useFeature()`.
  - Chỉ import các phần nội bộ của feature từ file barrel `index.ts` khi có thể, ví dụ: `import { styles, useProfile } from '.'`.
  - BẮT BUỘC ưu tiên sử dụng shared UI primitives từ `src/shared/components/ui` thay vì raw HTML element cho layout, form controls, button, label, input, card, typography, modal, sheet, tooltip...
  - Nếu feature cần một primitive chưa có trong `src/shared/components/ui`, hãy tạo common component đó theo đúng `FE_COMPONENT_PATTERN.md` trước, rồi mới dùng trong `page.tsx`.
  - Chỉ dùng raw HTML tag cho semantic text/structure khi project chưa có shared UI primitive phù hợp và task không yêu cầu tạo mới. Với feature page mới/refactor lớn, nên bổ sung primitive còn thiếu.
  - Có thể import common component, icon, component con trong `_components/`, và constant dùng để render UI.

- `_use-[feature].ts`: Custom hook chứa TOÀN BỘ state và logic của feature.
  - Tên hook phải rõ ràng, ví dụ `useProfile`, `useFoodSearch`.
  - Quản lý state bằng React hooks như `useState`, `useReducer`, `react-hook-form`, hoặc hook có sẵn của project nếu feature đang dùng.
  - Nếu feature có thao tác async, bắt buộc expose `isLoading`.
  - Chứa handler như `onSubmit`, `handleBack`, `setSearchTerm`, `handleFilterChange`, `updateURL`, `fetchData`.
  - Chứa logic route/search params nếu feature cần URL state.
  - Không render JSX trong file hook.

- `_interface.ts`: Chứa toàn bộ type/interface/schema liên quan trực tiếp đến feature.
  - Đặt type/interface rõ nghĩa như `ProfileFormData`, `ProfileState`, `ProfileProps`.
  - Nếu feature dùng schema validation như Zod, có thể đặt schema ở đây khi schema chỉ phục vụ riêng feature đó.
  - Không đặt UI hoặc handler implementation trong file này.

- `_styles.ts`: Chứa toàn bộ style object/helper style của feature theo chuẩn MUI `sx`.
  - Import `Theme` từ `@mui/material/styles`.
  - Mỗi style phải là function nhận `theme: Theme` và trả về object style, ví dụ `containerStyles(theme) => ({ ... })`.
  - Export object `styles` chứa các style function, đặt tên theo dạng `[element]Styles`.
  - KHÔNG export Tailwind className string trong `_styles.ts`.
  - KHÔNG đặt logic state hoặc JSX trong file này.
  - Không đặt logic state hoặc JSX trong file này.

- `index.ts`: File barrel export.
  - Export tất cả từ `_use-[feature]`, `_styles`, `_interface`.
  - Export default từ `page.tsx` bằng tên feature.

- `_components/`: Thư mục chứa component con chỉ phục vụ riêng feature này nếu UI phức tạp.
  - Component con cũng nên tách `page.tsx`, `_interface.ts`, `_styles.ts`, `index.ts` nếu đủ lớn.
  - Component con nhỏ có thể chỉ là `page.tsx` nếu không có logic/type/style riêng đáng kể.

2. Quy tắc viết Logic trong `_use-[feature].ts`

- Hook phải là nơi duy nhất quản lý state chính của feature.
- UI gọi hook và nhận về state, loading, data, handlers.
- Nếu có async action:
  - Set `isLoading(true)` trước khi chạy action.
  - Dùng `try/catch/finally`.
  - Set `isLoading(false)` trong `finally`.
- Nếu feature có URL/search params:
  - Dùng `useRouter`, `usePathname`, `useSearchParams` từ `next/navigation`.
  - Dùng `URLSearchParams` để build query string.
  - Viết helper `updateURL` trong hook.
- Nếu feature gọi API:
  - Ưu tiên service/api client sẵn có của project.
  - Không gọi API trực tiếp trong `page.tsx`.
- Không thêm logic mới khi refactor. Chỉ di chuyển logic hiện có sang hook.

3. Quy tắc viết UI trong `page.tsx`

- Component chính phải tập trung render UI.
- Không khai báo schema, không gọi API, không đặt business logic dài trong UI.
- Không khai báo inline helper phức tạp nếu helper đó có thể đưa vào hook hoặc `_components`.
- Không dùng trực tiếp raw HTML form controls như `<button>`, `<input>`, `<label>`, `<textarea>` nếu đã có component tương ứng trong `src/shared/components/ui`.
- Với wrapper/layout như `<div>`, `<section>`, `<form>`, ưu tiên dùng shared primitive như `Box` hoặc component UI tương ứng.
- Với text element như `<h1>`, `<h2>`, `<p>`, `<span>`, ưu tiên dùng shared primitive như `Typography` khi cần styling trong feature page.
- Dùng `styles` từ `_styles.ts` qua prop `sx`, ví dụ `sx={styles.containerStyles}`.
- Không dùng `className={styles.xxx}` trong feature page.
- Giữ UI hiện tại khi refactor, trừ khi task yêu cầu thay đổi giao diện.

4. Quy tắc barrel export trong `index.ts`

Ví dụ với feature `Profile`:

```ts
/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export * from "./_use-profile";
export * from "./_styles";
export * from "./_interface";
export { default as Profile } from "./page";
```

5. Code mẫu tối giản

\_interface.ts

```ts
/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
```

\_styles.ts

```ts
/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

export const containerStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: "48rem",
  marginInline: "auto",
});

export const titleStyles = (theme: Theme) => ({
  fontSize: "1.875rem",
  lineHeight: "2.25rem",
  fontWeight: 700,
});

export const submitButtonStyles = (theme: Theme) => ({
  height: 40,
  borderRadius: "0.375rem",
});

export const styles = {
  containerStyles,
  titleStyles,
  submitButtonStyles,
} as const;
```

\_use-profile.ts

```ts
/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { profileSchema, ProfileFormData } from ".";

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // call API or existing submit logic here
      console.log(data);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    control: form.control,
    errors: form.formState.errors,
    handleSubmit: form.handleSubmit,
    isLoading,
    onSubmit,
    register: form.register,
  };
}
```

page.tsx

```tsx
/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { styles, useProfile } from ".";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Input } from "@/shared/components/ui/input/index";

export default function Profile() {
  const { register, handleSubmit, onSubmit, isLoading } = useProfile();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} sx={styles.containerStyles}>
      <Input {...register("fullName")} />
      <Button disabled={isLoading} sx={styles.submitButtonStyles}>
        Save
      </Button>
    </Form>
  );
}
```

index.ts

```ts
/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export * from "./_use-profile";
export * from "./_styles";
export * from "./_interface";
export { default as Profile } from "./page";
```
