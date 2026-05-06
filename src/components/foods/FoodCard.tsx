import { Food } from "@/data/mockFoods";

interface FoodCardProps {
  food: Food;
  onClick: () => void;
}

export default function FoodCard({ food, onClick }: FoodCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50 flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={food.image} 
          alt={food.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {food.allergies && food.allergies.length > 0 && (
            <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm shadow-sm">
              Cảnh báo dị ứng
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {food.name}
          </h3>
          <span className="text-sm font-medium text-primary whitespace-nowrap">
            {food.nutrition.calories} kcal
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {food.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-auto">
          {food.categories.slice(0, 3).map(cat => (
            <span key={cat} className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {cat}
            </span>
          ))}
          {food.categories.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              +{food.categories.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
