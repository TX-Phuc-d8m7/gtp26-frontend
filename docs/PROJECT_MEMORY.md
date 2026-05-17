# PROJECT MEMORY - Frontend

## Tổng Quan

Frontend của Foodie Suggest dùng Next.js App Router, TypeScript và Material UI `sx` cho style nội bộ. `src/app` là tầng routing của Next.js, chỉ nên điều phối route/layout và gọi feature tương ứng. `src/features` chứa UI, state và business logic theo từng domain. `src/shared/components/ui` chứa các primitive dùng chung như Button, Input, Sheet, Tooltip, Typography.

## Pattern Bắt Buộc

Feature mới hoặc feature được refactor cần theo cấu trúc:

- `page.tsx`: render UI chính của feature.
- `_use-[feature].ts`: hook quản lý state, handler, side effect.
- `_interface.ts`: type/interface/export contract của feature.
- `_styles.ts`: style object/function dùng MUI `sx`.
- `index.ts`: public export.

Shared UI primitive cần theo pattern 4 file của `docs/FE_COMPONENT_PATTERN.md`: `page.tsx`, `_styles.ts`, `_interface.ts`, `index.ts`. Không dùng CSS rời rạc hoặc Tailwind/className để định nghĩa style mới nếu có thể biểu diễn bằng MUI `sx`.

## Trạng Thái Chat Hiện Tại

- `src/features/chat/components/thread/index.tsx` trước đây giữ `localMessages` trực tiếp trong component state.
- `threadId` và `chatHistoryOpen` đang nằm trên URL query param thông qua `nuqs`; `threadId` vẫn là source of truth cho active thread.
- `ThreadHistory` đã có UI sidebar/sheet, nhưng provider cũ chỉ trả mock thread.
- `StreamProvider` hiện là compatibility wrapper cho LangGraph stream, chưa dùng streaming thật từ backend.
- Flow chat hiện tại vẫn dựa trên food search: gửi query, nhận gợi ý món ăn, render assistant bubble và food recommendation cards.

## Quyết Định Roadmap

- Ưu tiên xây multi-thread chat UI shell trước khi backend LangGraph hoàn chỉnh.
- Frontend dùng adapter nội bộ trước, implementation ban đầu lưu `localStorage`.
- Mọi tính năng chat mới phải đi qua adapter/hook/provider; không gọi `fetch` trực tiếp trong component UI.
- Khi backend sẵn sàng, thay implementation adapter localStorage bằng HTTP adapter mà hạn chế sửa UI.
- Không build UI cho Crawler, Enricher, Indexer ở giai đoạn này.

## Chat Adapter Contract

Frontend dùng type riêng, không bind trực tiếp UI vào `@langchain/langgraph-sdk`:

- `ChatThread`: metadata của một cuộc trò chuyện.
- `ChatMessage`: message theo thread, hỗ trợ role, status, foods, insight, feedback, attachments.
- `ChatSendPayload`: payload gửi message.
- `ChatApiAdapter`: contract duy nhất để list/create/load/send/rename/delete/update feedback.

Adapter hiện tại cần hỗ trợ:

- `listThreads()`
- `createThread(initialMessage?)`
- `getMessages(threadId)`
- `sendMessage(payload)`
- `renameThread(threadId, title)`
- `deleteThread(threadId)`
- `updateMessageFeedback(threadId, messageId, feedback)`

Khi backend LangGraph sẵn sàng, adapter HTTP dự kiến map sang:

- `GET /chat/threads`
- `POST /chat/threads`
- `GET /chat/threads/{thread_id}/messages`
- `POST /chat/threads/{thread_id}/messages`
- `PATCH /chat/threads/{thread_id}`
- `DELETE /chat/threads/{thread_id}`

Nếu backend chỉ có `/foods/search` ở giai đoạn đầu, adapter vẫn có thể tự tạo local thread và dùng `/foods/search?q=...` để sinh assistant response.

## Roadmap Frontend Gần Nhất

### Phase 1 - Multi-Thread Shell

- Chuẩn hóa type `ChatThread`, `ChatMessage`, `ChatApiAdapter`.
- Tạo adapter localStorage.
- Di chuyển state thread/message vào provider.
- Thread history dùng data thật từ adapter, có active state, empty state, rename/delete.
- New Thread chỉ clear active `threadId`, input và attachments; không xóa thread cũ.

### Phase 2 - Message UX Chuẩn Bị Cho LangGraph

- Message renderer hỗ trợ `sending`, `streaming`, `complete`, `error`.
- Giữ human bubble, assistant bubble, food recommendation cards, feedback, regenerate, attachments.
- Thêm retry flow cho message lỗi.
- Chuẩn bị interface để nhận streaming chunks sau này.

### Phase 3 - Backend Integration Switch

- Thay adapter localStorage bằng HTTP adapter khi FastAPI/LangGraph có thread API.
- Truyền `threadId` qua request để backend có thể checkpoint/memory theo thread.
- UI không gọi backend trực tiếp ngoài adapter.

## QA Cần Duy Trì

- Mở app chưa có thread: thấy empty chat panel.
- Gửi message đầu tiên: tự tạo thread, URL có `threadId`, history có item mới.
- Chọn thread khác: nội dung chat đổi đúng.
- Bấm New Thread: composer sạch, thread cũ vẫn còn.
- Reload page: thread và messages localStorage vẫn còn.
- Rename/delete thread hoạt động.
- Mobile sheet history dùng cùng data với desktop sidebar.
- Các route `/`, `/search`, `/profile`, `/login`, `/signup`, `/onboarding` vẫn render.
