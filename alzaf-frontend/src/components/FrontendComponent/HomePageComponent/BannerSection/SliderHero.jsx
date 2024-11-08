"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SkeletonSlide from "./SkeletonSlide";

const CustomSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (slides.length > 0) {
      const autoSlideTimeout = setTimeout(() => {
        nextSlide();
      }, 5000);
      return () => clearTimeout(autoSlideTimeout);
    }
  }, [currentIndex, slides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleStart = (event) => {
    setIsDragging(true);
    setStartPosition(
      event.type.includes("mouse") ? event.clientX : event.touches[0].clientX
    );
    setCurrentTranslate(0);
  };

  const handleMove = (event) => {
    if (isDragging) {
      const currentPosition = event.type.includes("mouse")
        ? event.clientX
        : event.touches[0].clientX;
      const distance = currentPosition - startPosition;
      setCurrentTranslate(distance);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (currentTranslate < -100) {
      nextSlide();
    }
    if (currentTranslate > 100) {
      prevSlide();
    }
    setCurrentTranslate(0);
  };

  return (
    <div className="mt-16">
      <div
        className="relative w-full h-[60vh] overflow-hidden shadow-lg shadow-blue-500/50"
        ref={sliderRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {loading
          ? [1, 2, 3].map((_, index) => <SkeletonSlide key={index} />)
          : slides?.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
              >
                <div className="w-3/4 md:w-full h-full bg-black bg-opacity-50 flex flex-col justify-center ">
                  <div>
                    <Image
                      src={slide?.backgroundImage}
                      alt=""
                      className="h-full w-full md:w-full object- md:object-cover"
                      fill
                    />
                  </div>
                </div>
              </div>
            ))}

        <button
          onClick={prevSlide}
          className="absolute hidden top-1/2 z-50 left-5 transform -translate-y-1/2 text-white text-3xl border border-transparent hover:border duration-200 hover:border-white bg-opacity-50 px-1 rounded-full hover:bg-opacity-80"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="hidden absolute top-1/2 z-50 right-5 transform -translate-y-1/2 text-white text-3xl border border-transparent hover:border duration-200 hover:border-white bg-opacity-50 px-1 rounded-full hover:bg-opacity-80"
        >
          &#8594;
        </button>
        <div className="absolute bottom-5 w-full flex justify-center space-x-2 z-50">
          {slides?.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full cursor-pointer transition duration-300 ${
                currentIndex === index ? "bg-orange-500 w-9" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
