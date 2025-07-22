"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

const workers = [
  {
    name: "Blake Whitney",
    role: "Placeholder",
    description: "Placeholder",
    image: "/blake.jpg",
  },
  {
    name: "Dan Whitney",
    role: "Placeholder",
    description: "Placeholder",
    image: "/danc.jpg",
  },
  {
    name: "Hayden placeholder",
    role: "Farm Manager",
    description: "Placeholder",
    image: "/hayden.jpg",
  },
  {
    name: "Kathryn Placeholder",
    role: "Nursery Manager",
    description: "Placeholder",
    image: "/kathc.jpg",
  },
  {
    name: "Celco placeholder",
    role: "Placeholder",
    description: "Placeholder",
    image: "/logo.jpg",
  },
  {
    name: "Lorenzo placeholder",
    role: "Placeholder",
    description: "Placeholder",
    image: "/logo.jpg",
  },
  {
    name: "Macie Kolodziejczyk",
    role: "Farm Hand/Diver",
    description: "Placeholder",
    image: "/logo.jpg",
  },
  {
    name: "Andrew Bingham",
    role: "Clown",
    description: "Placeholder",
    image: "/andrew.JPEG",
  },
  {
    name: "Cael Findley",
    role: "Software Developer",
    description: "Placeholder",
    image: "/logo.jpg",
  },
];

export default function TeamScroller() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 md:py-8 relative">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Meet Our Team</h2>
      
      {/* Desktop scroll buttons */}
      <div className="hidden md:block">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
            canScrollLeft ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-purple-600" />
        </button>
        
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
            canScrollRight ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-purple-600" />
        </button>
      </div>

      <div 
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 md:pb-6 md:px-12 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent hover:scrollbar-thumb-purple-400"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#c084fc transparent' }}
      >
        {workers.map((worker, idx) => (
          <div
            key={idx}
            className="min-w-[200px] sm:min-w-[220px] md:min-w-[240px] bg-white rounded-lg shadow-md p-4 md:p-6 flex-shrink-0 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 md:mb-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-purple-200">
                <Image
                  src={worker.image}
                  alt={worker.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  quality={100}
                />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-center mb-1 md:mb-2 leading-tight break-words max-w-[8rem] md:max-w-[10rem]">{worker.name}</h3>
              <p className="text-xs md:text-sm text-gray-500 text-center mb-2 md:mb-3 leading-tight break-words max-w-[8rem] md:max-w-[10rem]">{worker.role}</p>
              <p className="text-xs md:text-sm text-gray-700 text-center leading-relaxed break-words max-w-[8rem] md:max-w-[10rem]">{worker.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
} 