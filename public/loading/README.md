# Loading Media

Đặt file loading của hệ thống tại đây để Next.js serve qua URL tĩnh:

- GIF: `public/loading/foodie-loader.gif`
- MP4: `public/loading/foodie-loader.mp4`

Nếu dùng MP4, đổi `mediaSrc` trong `src/app/loading.tsx` thành:

```tsx
<AppLoading mediaSrc="/loading/foodie-loader.mp4" mediaType="video" />
```

Nếu chưa có file media, màn loading sẽ tự dùng fallback animation bằng CSS.
