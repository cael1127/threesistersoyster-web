"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

const workers = [
  {
    name: "Blake Whitney",
    role: "Owner & Founder",
    description: "Blake founded Three Sisters Oyster Co. with a vision for sustainable aquaculture. With his background in Range and Wildlife Management, he leads our environmental stewardship efforts and farm operations. (Sample)",
    image: "/blake.jpg",
  },
  {
    name: "Dan Whitney",
    role: "Senior Advisor",
    description: "Dan oversees daily farm operations and logistics. His expertise in coastal operations ensures smooth coordination between our nursery and farm sites in Keller Bay. (Sample)",
    image: "/danc.jpg",
  },
  {
    name: "Hayden Warren",
    role: "Farm Manager",
    description: "Hayden manages our grow-out operations and coordinates harvest schedules. His hands-on approach ensures our oysters reach market at peak quality and size.",
    image: "/hayden.jpg",
  },
  {
    name: "Kathryn Davin",
    role: "Nursery Manager",
    description: "Kathryn oversees our seed oyster production and nursery operations. Her attention to detail ensures healthy stock for both our farm and wholesale customers.",
    image: "/kathc.jpg",
  },
  {
    name: "Celco ",
    role: "Farm Hand",
    description: "Celco brings years of coastal work experience to our team. He specializes in equipment maintenance and boat operations, keeping our fleet running smoothly. (Sample)",
    image: "/logo.jpg",
  },
  {
    name: "Lorenzo ",
    role: "Farm Hand",
    description: "Lorenzo is skilled in oyster handling and grading. His expertise in shellfish care helps maintain the high quality standards Three Sisters is known for. (Sample)",
    image: "/lorenzo.JPEG",
  },
  {
    name: "Macie Kolodziejczyk",
    role: "Farm Hand",
    description: "Macie assists with daily farm operations and oyster processing. Her dedication to sustainable practices aligns perfectly with our environmental mission.",
    image: "/maciek.JPEG",
  },
 
  {
    name: "Andrew Bingham",
    role: "Farm Hand",
    description: "Andrew assists with daily farm operations and oyster processing. His dedication to sustainable practices aligns perfectly with our environmental mission. (Sample)",
    image: "/andrew.JPEG",
  },
  {
    name: "Cael Findley",
    role: "Software Developer",
    description: "Cael develops and maintains our digital infrastructure, including inventory tracking systems and our e-commerce platform. He helps modernize our operations through technology. (Sample)",
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
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-purple-900">Meet Our Team</h2>
      
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
            className="min-w-[200px] sm:min-w-[220px] md:min-w-[240px] bg-white border border-purple-200 rounded-lg shadow-md p-4 md:p-6 flex-shrink-0 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 md:mb-4 rounded-full overflow-hidden flex items-center justify-center bg-mintBrand/20 border border-mintBrand/30">
                <Image
                  src={worker.image}
                  alt={worker.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  quality={100}
                />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-center mb-1 md:mb-2 leading-tight break-words max-w-[8rem] md:max-w-[10rem] text-purple-900">{worker.name}</h3>
              <p className="text-xs md:text-sm text-white text-center mb-2 md:mb-3 leading-tight break-words max-w-[8rem] md:max-w-[10rem]">{worker.role}</p>
              <p className="text-xs md:text-sm text-purple-800 text-center leading-relaxed break-words max-w-[8rem] md:max-w-[10rem]">{worker.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-mintBrand rounded-full"></div>
          <div className="w-2 h-2 bg-mintBrand rounded-full"></div>
          <div className="w-2 h-2 bg-mintBrand rounded-full"></div>
        </div>
      </div>
    </div>
  );
} 