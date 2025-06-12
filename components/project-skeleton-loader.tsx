import { motion } from "framer-motion";

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Skeleton */}
          <div className="relative overflow-hidden aspect-[15/7]">
            <div className="w-full h-full bg-neutral-800 animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="p-6">
            {/* Title Skeleton */}
            <div className="h-6 w-3/4 bg-neutral-800 rounded animate-pulse mb-2" />

            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-neutral-800 rounded animate-pulse" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-16 bg-neutral-800 rounded animate-pulse"
                />
              ))}
            </div>

            {/* Buttons Skeleton */}
            <div className="flex justify-between items-center">
              <div className="h-8 w-32 bg-neutral-800 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-neutral-800 rounded-full animate-pulse" />
                <div className="h-8 w-8 bg-neutral-800 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
