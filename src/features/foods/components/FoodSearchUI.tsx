"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  HeartPulse,
  ChefHat,
  Info,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MOCK_FOODS, Food } from "@/features/foods/data/mock-foods";
import FoodCard from "./FoodCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";

interface FoodSearchUIProps {
  onClose?: () => void;
}

export default function FoodSearchUI({ onClose }: FoodSearchUIProps = {}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  // Lấy tất cả categories độc nhất từ mock data
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    MOCK_FOODS.forEach((f) => f.categories.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, []);

  // Filter foods
  const filteredFoods = useMemo(() => {
    return MOCK_FOODS.filter((food) => {
      const matchSearch =
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory
        ? food.categories.includes(selectedCategory)
        : true;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (onClose ? onClose() : router.push("/"))}
              className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h1 className="text-xl font-bold">Tra cứu món ăn</h1>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm món ăn, nguyên liệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            <button className="h-12 w-12 flex items-center justify-center rounded-xl border border-input bg-background hover:bg-secondary transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-secondary"
              }`}
            >
              Tất cả
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {!searchTerm.trim() ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-medium">
                Nhập từ khóa để tra cứu món ăn
              </p>
              <p className="text-muted-foreground">
                Ví dụ: bún, món ít dầu mỡ, món cho người tiểu đường...
              </p>
            </div>
          ) : filteredFoods.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-medium">Không tìm thấy món ăn nào</p>
              <p className="text-muted-foreground">
                Hãy thử với từ khóa khác hoặc bỏ chọn bộ lọc.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onClick={() => setSelectedFood(food)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Sheet/Modal */}
      <Sheet
        open={selectedFood !== null}
        onOpenChange={(open) => !open && setSelectedFood(null)}
      >
        <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto p-0">
          {selectedFood && (
            <div className="flex flex-col min-h-full">
              {/* Image Header */}
              <div className="relative h-64 w-full bg-muted shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <SheetTitle className="text-3xl font-bold text-foreground mb-1">
                    {selectedFood.name}
                  </SheetTitle>
                  <p className="text-primary font-semibold">
                    {selectedFood.priceRange}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Description */}
                <div>
                  <SheetDescription className="text-base text-foreground/90 leading-relaxed">
                    {selectedFood.description}
                  </SheetDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedFood.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nutrition Grid */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold mb-3">
                    <HeartPulse className="w-5 h-5 text-primary" />
                    Dinh dưỡng (Ước tính)
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-muted p-2 rounded-lg">
                      <div className="text-lg font-bold">
                        {selectedFood.nutrition.calories}
                      </div>
                      <div className="text-xs text-muted-foreground">Kcal</div>
                    </div>
                    <div className="bg-muted p-2 rounded-lg">
                      <div className="text-lg font-bold">
                        {selectedFood.nutrition.protein}g
                      </div>
                      <div className="text-xs text-muted-foreground">Đạm</div>
                    </div>
                    <div className="bg-muted p-2 rounded-lg">
                      <div className="text-lg font-bold">
                        {selectedFood.nutrition.carbs}g
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tinh bột
                      </div>
                    </div>
                    <div className="bg-muted p-2 rounded-lg">
                      <div className="text-lg font-bold">
                        {selectedFood.nutrition.fat}g
                      </div>
                      <div className="text-xs text-muted-foreground">Béo</div>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold mb-3">
                    <ChefHat className="w-5 h-5 text-primary" />
                    Thành phần chính
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFood.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-3 py-1.5 bg-background border border-border rounded-md text-sm"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medical & Allergy Warnings */}
                {(selectedFood.allergies || selectedFood.medicalAdvice) && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-red-600 dark:text-red-400 mb-2">
                      <Info className="w-5 h-5" />
                      Lưu ý sức khỏe
                    </h4>
                    {selectedFood.allergies &&
                      selectedFood.allergies.length > 0 && (
                        <p className="text-sm text-foreground mb-2">
                          <strong className="text-red-600 dark:text-red-400">
                            Dị ứng:
                          </strong>{" "}
                          Có chứa {selectedFood.allergies.join(", ")}.
                        </p>
                      )}
                    {selectedFood.medicalAdvice && (
                      <p className="text-sm text-foreground">
                        <strong className="text-red-600 dark:text-red-400">
                          Khuyên dùng:
                        </strong>{" "}
                        {selectedFood.medicalAdvice}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
