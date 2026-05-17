import { Card, CardContent, Skeleton, Box } from "@mui/material";

export function FoodCardSkeleton() {
  return (
    <Card className="!mb-4">
      <CardContent className="!p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Image Skeleton */}
        <div className="w-full md:w-48 h-40 flex-shrink-0 bg-gray-200">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <Skeleton width="30%" height={20} className="!mb-2" />
              <Skeleton width="60%" height={28} className="!mb-3" />
            </div>

            {/* Score Bar */}
            <Skeleton variant="rectangular" width="100%" height={8} />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton width="100%" height={16} />
              <Skeleton width="90%" height={16} />
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} width="100%" height={32} />
              ))}
            </div>

            {/* Button */}
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FoodCardSkeletonList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
}
