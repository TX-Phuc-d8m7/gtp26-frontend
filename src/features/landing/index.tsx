"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SlidersHorizontal,
  Sparkles,
  UtensilsCrossed,
  CloudSun,
  CalendarDays,
  BookOpen,
  Users,
  Leaf,
  Star,
  ArrowRight,
  Gauge,
  Timer,
  ChevronDown,
} from "lucide-react";
import favicon2 from "../../app/favicon2.svg";

const IMG = {
  heroMain:
    "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&h=700&q=85&auto=format&fit=crop",
  heroCard1:
    "https://images.unsplash.com/photo-1597345637412-9fd611e758f3?w=500&h=400&q=80&auto=format&fit=crop",
  heroCard2:
    "https://images.unsplash.com/photo-1628997323766-c846909a7049?w=500&h=350&q=80&auto=format&fit=crop",
  feature:
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=700&h=800&q=85&auto=format&fit=crop",
  dishes: [
    {
      src: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?w=500&h=600&q=80&auto=format&fit=crop&crop=entropy",
      name: "Phở bò tái",
      cat: "Món nước",
      time: "45 phút",
    },
    {
      src: "https://images.unsplash.com/photo-1590420882553-4f9150b71f92?w=500&h=400&q=80&auto=format&fit=crop",
      name: "Bún bò Huế",
      cat: "Món nước",
      time: "60 phút",
    },
    {
      src: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500&h=500&q=80&auto=format&fit=crop",
      name: "Cơm tấm sườn",
      cat: "Cơm",
      time: "30 phút",
    },
    {
      src: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&h=400&q=80&auto=format&fit=crop",
      name: "Bánh mì thịt",
      cat: "Bánh",
      time: "15 phút",
    },
    {
      src: "https://images.unsplash.com/photo-1625540002162-00320b5c6b63?w=500&h=600&q=80&auto=format&fit=crop",
      name: "Bún chả Hà Nội",
      cat: "Bún",
      time: "40 phút",
    },
    {
      src: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=500&h=400&q=80&auto=format&fit=crop",
      name: "Gỏi cuốn tôm thịt",
      cat: "Gỏi",
      time: "20 phút",
    },
  ],
};

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
      style={{ background: "#fff3e8", color: "#ea580c", border: "1px solid #fcd9b0" }}
    >
      {children}
    </span>
  );
}

export function LandingPage() {
  const router = useRouter();
  const goToChat = () => router.push("/chat");

  return (
    <div className="min-h-screen bg-warm font-sans antialiased" style={{ color: "#1c1917" }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-orange-100/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <img 
              src={favicon2.src} 
              alt="App Icon" 
              className="w-9 h-9" // Bạn có thể chỉnh lại w-5 h-5 cho vừa mắt
            />
            <span className="font-bold text-base leading-none" style={{ color: "#1c1917" }}>
              Hôm nay<br />
              <span className="text-gradient">bạn ăn gì?</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "#78716c" }}>
            {[
              { label: "Tính năng", href: "#tinh-nang" },
              { label: "Thực đơn", href: "#thuc-don" },
              { label: "Hướng dẫn", href: "#huong-dan" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-orange-500 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={goToChat}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-orange-200 active:scale-95"
            style={{ background: "linear-gradient(135deg,#f97316,#dc2626)" }}
          >
            Khám phá ngay
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#fdba74,transparent 70%)" }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle,#fca5a5,transparent 70%)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center py-16 lg:py-24">

            {/* Left: Copy */}
            <div className="flex flex-col gap-6 lg:pr-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionLabel>✨ Trợ lý ẩm thực AI</SectionLabel>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold leading-[1.05] tracking-tight"
              >
                Bữa ăn ngon{" "}
                <span className="text-gradient">mỗi ngày,</span>
                <br />
                không còn{" "}
                <span className="relative">
                  phân vân
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 Q100 2 198 8" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg leading-relaxed max-w-lg"
                style={{ color: "#78716c" }}
              >
                Hệ thống gợi ý món ăn thông minh — cá nhân hóa theo khẩu vị, thời tiết
                và nguyên liệu bạn có sẵn. Đi kèm công thức nấu chi tiết từng bước.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={goToChat}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base text-white shadow-xl shadow-orange-200 transition-all duration-200 hover:shadow-2xl hover:shadow-orange-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg,#f97316,#dc2626)" }}
                >
                  <Sparkles className="w-5 h-5" />
                  Khám phá món ăn
                </button>
                <a
                  href="#tinh-nang"
                  className="flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base glass transition-all duration-200 hover:shadow-md"
                  style={{ color: "#44403c" }}
                >
                  Xem tính năng
                  <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-center gap-4 pt-2"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#1c1917" }}>4.9/5</span>
                <span className="text-sm" style={{ color: "#a8a29e" }}>· 12,450 gợi ý đã tạo</span>
              </motion.div>
            </div>

            {/* Right: Image collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[520px] lg:h-[600px] hidden sm:block"
            >
              <div className="absolute top-0 right-0 w-[72%] h-[75%] rounded-3xl overflow-hidden shadow-2xl shadow-orange-100">
                <Image src={IMG.heroMain} alt="Phở bò Việt Nam" fill className="object-cover" priority />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg,transparent 60%,rgba(0,0,0,0.25))" }}
                />
              </div>

              <div className="absolute bottom-0 left-0 w-[52%] h-[52%] rounded-3xl overflow-hidden shadow-xl shadow-stone-200 border-4 border-white">
                <Image src={IMG.heroCard1} alt="Món ăn Việt Nam" fill className="object-cover" />
              </div>

              <div className="absolute top-[8%] left-[-2%] w-[36%] h-[38%] rounded-2xl overflow-hidden shadow-lg shadow-stone-200 border-4 border-white">
                <Image src={IMG.heroCard2} alt="Ẩm thực Việt" fill className="object-cover" />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-[34%] right-[-4%] glass rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 min-w-[200px]"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: "#fff3e8" }}
                >
                  🌤️
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#a8a29e" }}>Thời tiết hôm nay</div>
                  <div className="text-sm font-semibold" style={{ color: "#1c1917" }}>32°C · Gợi ý: Gỏi cuốn</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                className="absolute top-[8%] right-[-2%] glass rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3"
              >
                <span className="text-xl">🔥</span>
                <div>
                  <div className="text-xs" style={{ color: "#a8a29e" }}>Phổ biến hôm nay</div>
                  <div className="text-sm font-semibold" style={{ color: "#1c1917" }}>Phở bò tái</div>
                </div>
              </motion.div>

              <div
                className="absolute bottom-[12%] right-[10%] w-20 h-20 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
                  backgroundSize: "8px 8px",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section
        className="border-y border-orange-100 py-8"
        style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "500+", label: "Món ăn Việt Nam" },
            { value: "12K+", label: "Người dùng tin tưởng" },
            { value: "4.9★", label: "Đánh giá trung bình" },
            { value: "<3s", label: "Thời gian gợi ý" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="text-3xl font-extrabold text-gradient">{s.value}</div>
              <div className="text-sm mt-1" style={{ color: "#78716c" }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="huong-dan" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Quy trình</SectionLabel>
          <h2 className="text-4xl font-extrabold mt-4 mb-3">Cách thức hoạt động</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#78716c" }}>
            Ba bước đơn giản để có ngay gợi ý món ăn phù hợp với bạn
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div
            className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px"
            style={{ background: "linear-gradient(90deg,transparent,#fed7aa,transparent)" }}
          />

          {[
            {
              step: "01",
              icon: <SlidersHorizontal className="w-7 h-7" />,
              title: "Cá nhân hóa khẩu vị",
              desc: "Cho biết sở thích, nguyên liệu sẵn có và hạn chế ăn kiêng của bạn.",
              color: "#fff3e8",
              iconColor: "#f97316",
            },
            {
              step: "02",
              icon: <Sparkles className="w-7 h-7" />,
              title: "AI phân tích & gợi ý",
              desc: "Hệ thống phân tích hàng trăm yếu tố — khẩu vị, thời tiết, dinh dưỡng — để chọn món tối ưu.",
              color: "#fef3c7",
              iconColor: "#d97706",
            },
            {
              step: "03",
              icon: <UtensilsCrossed className="w-7 h-7" />,
              title: "Nhận thực đơn & công thức",
              desc: "Thực đơn gợi ý kèm công thức nấu chi tiết từng bước, điều chỉnh theo khẩu phần.",
              color: "#fce7f3",
              iconColor: "#db2777",
            },
          ].map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.12}>
              <div className="relative flex flex-col gap-5 p-8 rounded-3xl bg-white border border-orange-50 shadow-sm hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 group">
                <div
                  className="absolute top-6 right-6 text-6xl font-black opacity-5"
                  style={{ color: item.iconColor }}
                >
                  {item.step}
                </div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ background: item.color, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-1.5"
                    style={{ color: item.iconColor }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#78716c" }}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FEATURE SHOWCASE ───────────────────────────────────────────────── */}
      <section id="tinh-nang" className="py-24 overflow-hidden" style={{ background: "#fafaf8" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Features */}
            <div className="flex flex-col gap-8">
              <FadeIn>
                <SectionLabel>Tính năng</SectionLabel>
                <h2 className="text-4xl font-extrabold mt-4 mb-3">
                  Mọi thứ bạn cần<br />cho bữa ăn hoàn hảo
                </h2>
                <p style={{ color: "#78716c" }} className="text-base leading-relaxed">
                  Không chỉ gợi ý món — chúng tôi giúp bạn lên kế hoạch,
                  nấu ngon và ăn lành mạnh hơn.
                </p>
              </FadeIn>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <CloudSun className="w-5 h-5" />, title: "Theo thời tiết", desc: "Gợi ý món phù hợp với thời tiết thực tế hôm nay", color: "#eff6ff", ic: "#2563eb" },
                  { icon: <Gauge className="w-5 h-5" />, title: "Phân tích dinh dưỡng", desc: "Cân bằng calorie, đạm, tinh bột theo nhu cầu cơ thể", color: "#f0fdf4", ic: "#16a34a" },
                  { icon: <CalendarDays className="w-5 h-5" />, title: "Thực đơn cả tuần", desc: "Lên kế hoạch 7 ngày với danh sách mua sắm tự động", color: "#fff3e8", ic: "#f97316" },
                  { icon: <BookOpen className="w-5 h-5" />, title: "Công thức chi tiết", desc: "Hướng dẫn từng bước với hình ảnh minh họa rõ ràng", color: "#fef3c7", ic: "#d97706" },
                  { icon: <Users className="w-5 h-5" />, title: "Điều chỉnh khẩu phần", desc: "Tự động tính nguyên liệu theo số người ăn", color: "#fdf4ff", ic: "#9333ea" },
                  { icon: <Leaf className="w-5 h-5" />, title: "Chế độ ăn đặc biệt", desc: "Hỗ trợ chay, keto, ít muối, tiểu đường và nhiều hơn", color: "#f0fdf4", ic: "#16a34a" },
                ].map((f, i) => (
                  <FadeIn key={f.title} delay={i * 0.07}>
                    <div className="flex gap-3.5 p-4 rounded-2xl bg-white border border-stone-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200 group">
                      <div
                        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform"
                        style={{ background: f.color, color: f.ic }}
                      >
                        {f.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-0.5">{f.title}</div>
                        <div className="text-xs leading-relaxed" style={{ color: "#a8a29e" }}>{f.desc}</div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Right: Food image */}
            <FadeIn delay={0.2}>
              <div className="relative h-[580px] rounded-3xl overflow-hidden shadow-2xl shadow-stone-200">
                <Image src={IMG.feature} alt="Nguyên liệu nấu ăn tươi ngon" fill className="object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.45))" }}
                />

                <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-xs font-semibold mb-2" style={{ color: "#78716c" }}>Phân tích dinh dưỡng</div>
                    <div className="flex gap-3">
                      {[
                        { label: "Calorie", val: "420", unit: "kcal", bar: "#f97316", pct: 72 },
                        { label: "Đạm", val: "28", unit: "g", bar: "#3b82f6", pct: 56 },
                        { label: "Tinh bột", val: "52", unit: "g", bar: "#22c55e", pct: 48 },
                      ].map((n) => (
                        <div key={n.label} className="flex-1">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-[10px]" style={{ color: "#a8a29e" }}>{n.label}</span>
                            <span className="text-xs font-bold" style={{ color: "#1c1917" }}>
                              {n.val}
                              <span className="text-[9px] font-normal ml-0.5">{n.unit}</span>
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full" style={{ background: "#f5f5f4" }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${n.pct}%`, background: n.bar }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── DISH GALLERY ───────────────────────────────────────────────────── */}
      <section id="thuc-don" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel>Thực đơn</SectionLabel>
          <h2 className="text-4xl font-extrabold mt-4 mb-3">Khám phá hương vị Việt</h2>
          <p style={{ color: "#78716c" }} className="text-base">
            Hàng trăm món từ Nam ra Bắc, đơn giản đến tinh tế
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {IMG.dishes.map((dish, i) => (
            <FadeIn key={dish.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer group shadow-md hover:shadow-xl hover:shadow-stone-200 transition-shadow duration-300"
                style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "4/3" : "1/1" }}
              >
                <Image
                  src={dish.src}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.65))" }}
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                  style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
                >
                  {dish.cat}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="font-bold text-base leading-tight">{dish.name}</div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-white/70">
                    <Timer className="w-3 h-3" />
                    {dish.time}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <button
              onClick={goToChat}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base border-2 transition-all duration-200 hover:shadow-lg hover:shadow-orange-100 group"
              style={{ borderColor: "#f97316", color: "#f97316" }}
            >
              Xem tất cả món ăn
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#fafaf8" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Phản hồi</SectionLabel>
            <h2 className="text-4xl font-extrabold mt-4">Người dùng nói gì?</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                quote: "Từ ngày dùng app này tôi không còn phải hỏi 'hôm nay ăn gì' nữa. AI gợi ý đúng với khẩu vị đến lạ!",
                name: "Nguyễn Thị Lan",
                role: "Nội trợ · Hà Nội",
                stars: 5,
              },
              {
                quote: "Tính năng thực đơn cả tuần giúp tôi tiết kiệm được rất nhiều thời gian mua sắm và nấu nướng.",
                name: "Trần Minh Tuấn",
                role: "Nhân viên văn phòng · TP.HCM",
                stars: 5,
              },
              {
                quote: "Công thức nấu chi tiết, dễ làm theo. Con tôi thích ăn hơn vì được chọn món theo sở thích.",
                name: "Lê Thị Hồng",
                role: "Giáo viên · Đà Nẵng",
                stars: 5,
              },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300 flex flex-col gap-4 h-full">
                  <div className="flex">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed italic flex-1" style={{ color: "#44403c" }}>
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-stone-50">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#f97316,#dc2626)" }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs" style={{ color: "#a8a29e" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <div className="relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden text-white text-center py-20 px-6">
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg,#7c3aed 0%,#dc2626 45%,#ea580c 100%)" }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,200,100,0.2) 0%, transparent 60%)",
              }}
            />

            <div className="relative">
              <p className="text-sm font-semibold tracking-widest uppercase text-orange-200 mb-4">
                Bắt đầu ngay hôm nay · Miễn phí
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                Hôm nay bạn ăn gì?
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto">
                Để AI gợi ý cho bạn món ngon nhất — phù hợp với khẩu vị, thời tiết và sức khỏe của bạn.
              </p>
              <motion.button
                onClick={goToChat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white rounded-2xl font-bold text-lg shadow-2xl transition-all"
                style={{ color: "#dc2626" }}
              >
                <UtensilsCrossed className="w-5 h-5" />
                Khám phá ngay — Miễn phí
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="border-t py-12"
        style={{ borderColor: "#f5f0ea", background: "rgba(255,251,245,0.8)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "linear-gradient(135deg,#f97316,#dc2626)" }}
                >
                  🍜
                </div>
                <span className="font-bold" style={{ color: "#1c1917" }}>Hôm nay bạn ăn gì?</span>
              </div>
              <p className="text-sm" style={{ color: "#a8a29e" }}>
                Trợ lý ẩm thực AI dành riêng cho người Việt.
              </p>
            </div>

            {[
              { title: "Khám phá", links: ["Thực đơn", "Gợi ý hôm nay", "Món phổ biến", "Theo mùa"] },
              { title: "Tính năng", links: ["Gợi ý AI", "Lên thực đơn", "Công thức nấu", "Dinh dưỡng"] },
              { title: "Hỗ trợ", links: ["Về chúng tôi", "Hướng dẫn", "Liên hệ", "Phản hồi"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-semibold text-sm mb-4" style={{ color: "#1c1917" }}>{col.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors hover:text-orange-500" style={{ color: "#a8a29e" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3"
            style={{ borderColor: "#f0ebe4" }}
          >
            <p className="text-xs" style={{ color: "#c4bfbb" }}>
              © 2026 Hôm nay bạn ăn gì? · Được tạo với ❤️ cho người Đà Nẵng
            </p>
            <div className="flex gap-5 text-xs" style={{ color: "#c4bfbb" }}>
              <a href="#" className="hover:text-orange-500 transition-colors">Điều khoản</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Bảo mật</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
