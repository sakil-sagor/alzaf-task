const SkeletonSlide = () => {
  return (
    <div className="w-full h-[80vh] animate-pulse bg-gray-300 relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-2 md:px-10">
        <div className="flex flex-col justify-center items-start h-full text-left text-white">
          {/* Title */}
          <div className="w-3/4 h-10 md:h-16 bg-gray-500 rounded-md mb-4"></div>
          <div className="w-1/2 h-10 md:h-16 bg-gray-500 rounded-md mb-8"></div>

          {/* Subtitle */}
          <div className="w-full md:w-2/3 h-6 bg-gray-500 rounded-md mb-12"></div>

          {/* Button */}
          <div className="flex items-center">
            <div className="w-40 h-10 bg-gray-500 rounded-full"></div>
            <div className="ml-3 w-12 h-12 bg-gray-500 rounded-full"></div>
          </div>

          {/* Location */}
          <div className="mt-4 w-1/4 h-6 bg-gray-500 rounded-md"></div>

          {/* Stars and trust info */}
          <div className="hidden md:flex items-center gap-4 mt-4">
            <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
            <div className="flex flex-col">
              <div className="w-32 h-6 bg-gray-500 rounded-md"></div>
              <div className="mt-2 w-20 h-6 bg-gray-500 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSlide;
