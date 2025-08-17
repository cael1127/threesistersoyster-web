"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, MapPin, Leaf, Waves, Heart, Users, Crown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FloatingParticles } from "@/components/ui/floating-particles";

const workers = [
  {
    name: "Blake Whitney",
    role: "Owner & Founder",
    description: "Blake founded Three Sisters Oyster Co. with a vision for sustainable aquaculture. With his background in Range and Wildlife Management, he leads our environmental stewardship efforts and farm operations.",
    image: "/blake.jpg",
    icon: Crown,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-100 to-purple-200",
    borderColor: "border-purple-300",
    isLeadership: true
  },
  {
    name: "Dan Whitney",
    role: "Senior Advisor",
    description: "Dan oversees daily farm operations and logistics. His expertise in coastal operations ensures smooth coordination between our nursery and farm sites in Keller Bay.",
    image: "/danc.jpg",
    icon: Star,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-100 to-blue-200",
    borderColor: "border-blue-300",
    isLeadership: true
  },
  {
    name: "Hayden Warren",
    role: "Farm Manager",
    description: "Hayden manages our grow-out operations and coordinates harvest schedules. His hands-on approach ensures our oysters reach market at peak quality and size.",
    image: "/hayden.jpg",
    icon: MapPin,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-100 to-green-200",
    borderColor: "border-green-300",
    isLeadership: false
  },
  {
    name: "Kathryn Davin",
    role: "Nursery Manager",
    description: "Kathryn oversees our seed oyster production and nursery operations. Her attention to detail ensures healthy stock for both our farm and wholesale customers.",
    image: "/kathc.jpg",
    icon: Heart,
    color: "from-pink-500 to-pink-600",
    bgColor: "from-pink-100 to-pink-200",
    borderColor: "border-pink-300",
    isLeadership: false
  },
  {
    name: "Celco",
    role: "Farm Hand",
    description: "Celco brings years of coastal work experience to our team. He specializes in equipment maintenance and boat operations, keeping our fleet running smoothly.",
    image: "/logo.jpg",
    icon: Waves,
    color: "from-teal-500 to-teal-600",
    bgColor: "from-teal-100 to-teal-200",
    borderColor: "border-teal-300",
    isLeadership: false
  },
  {
    name: "Lorenzo",
    role: "Farm Hand",
    description: "Lorenzo is skilled in oyster handling and grading. His expertise in shellfish care helps maintain the high quality standards Three Sisters is known for.",
    image: "/logo.jpg",
    icon: Waves,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "from-cyan-100 to-cyan-200",
    borderColor: "border-cyan-300",
    isLeadership: false
  },
  {
    name: "Macie Kolodziejczyk",
    role: "Farm Hand",
    description: "Macie assists with daily farm operations and oyster processing. Her dedication to sustainable practices aligns perfectly with our environmental mission.",
    image: "/maciek.JPEG",
    icon: Leaf,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-100 to-emerald-200",
    borderColor: "border-emerald-300",
    isLeadership: false
  },
  {
    name: "Andrew Bingham",
    role: "Farm Hand",
    description: "Andrew assists with daily farm operations and oyster processing. His dedication to sustainable practices aligns perfectly with our environmental mission.",
    image: "/andrew.JPEG",
    icon: Waves,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-100 to-indigo-200",
    borderColor: "border-indigo-300",
    isLeadership: false
  },
  {
    name: "Cael Findley",
    role: "Software Developer",
    description: "Cael develops and maintains our digital infrastructure, including inventory tracking systems and our e-commerce platform. He helps modernize our operations through technology.",
    image: "/logo.jpg",
    icon: Users,
    color: "from-violet-500 to-violet-600",
    bgColor: "from-violet-100 to-violet-200",
    borderColor: "border-violet-300",
    isLeadership: false
  },
];

export default function TeamScroller() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredWorker, setHoveredWorker] = useState<number | null>(null);
  const [autoScroll, setAutoScroll] = useState(false);

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

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft >= scrollWidth - clientWidth) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <div className="py-6 md:py-8 relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingParticles particleCount={6} interactive={false} />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-gradient-to-br from-teal-400 to-green-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-purple-900">Meet Our Team</h2>
        
        {/* Auto-scroll toggle */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              autoScroll 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                : 'bg-white/80 text-purple-700 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            {autoScroll ? '🔄 Auto-scroll ON' : '▶️ Auto-scroll OFF'}
          </button>
        </div>
        
        {/* Desktop scroll buttons */}
        <div className="hidden md:block">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              canScrollLeft ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              canScrollRight ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 md:pb-6 md:px-16 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent hover:scrollbar-thumb-purple-400"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#c084fc transparent' }}
        >
          {workers.map((worker, idx) => {
            const IconComponent = worker.icon;
            return (
              <div
                key={idx}
                className={`min-w-[220px] sm:min-w-[240px] md:min-w-[260px] bg-white border-2 ${worker.borderColor} rounded-xl shadow-lg p-4 md:p-6 flex-shrink-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer group relative overflow-hidden ${
                  worker.isLeadership ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
                }`}
                onMouseEnter={() => setHoveredWorker(idx)}
                onMouseLeave={() => setHoveredWorker(null)}
              >
                {/* Leadership badge */}
                {worker.isLeadership && (
                  <div className="absolute top-2 right-2 z-20">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Role icon */}
                <div className={`absolute top-2 left-2 w-10 h-10 bg-gradient-to-br ${worker.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>

                <div className="flex flex-col items-center pt-8">
                  {/* Profile image with enhanced effects */}
                  <div className={`relative w-20 h-20 md:w-24 md:h-24 mb-3 md:mb-4 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br ${worker.bgColor} border-2 ${worker.borderColor} group-hover:border-opacity-100 transition-all duration-300`}>
                    <Image
                      src={worker.image}
                      alt={worker.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      quality={100}
                    />
                    
                    {/* Glowing overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${worker.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full`}></div>
                  </div>

                  {/* Member info */}
                  <h3 className="text-sm md:text-lg font-semibold text-center mb-1 md:mb-2 leading-tight break-words max-w-[8rem] md:max-w-[10rem] text-purple-900 group-hover:text-purple-800 transition-colors duration-300">
                    {worker.name}
                  </h3>
                  <p className={`text-xs md:text-sm text-center mb-2 md:mb-3 leading-tight break-words max-w-[8rem] md:max-w-[10rem] font-medium bg-gradient-to-r ${worker.color} bg-clip-text text-transparent`}>
                    {worker.role}
                  </p>
                  <p className={`text-xs md:text-sm text-purple-800 text-center leading-relaxed break-words max-w-[8rem] md:max-w-[10rem] ${
                    hoveredWorker === idx ? 'line-clamp-none' : 'line-clamp-3'
                  } transition-all duration-300`}>
                    {worker.description}
                  </p>
                </div>

                {/* Enhanced hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${worker.bgColor} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none`}></div>
                
                {/* Floating particles around the card */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute top-4 left-4 w-1.5 h-1.5 bg-gradient-to-r ${worker.color} rounded-full opacity-0 group-hover:opacity-100 animate-pulse`}></div>
                  <div className={`absolute top-6 right-6 w-1 h-1 bg-gradient-to-r ${worker.color} rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-100`}></div>
                  <div className={`absolute bottom-4 left-6 w-1.5 h-1.5 bg-gradient-to-r ${worker.color} rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-200`}></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced scroll indicator for mobile */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex space-x-2">
            {workers.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  hoveredWorker === idx ? 'bg-purple-500 scale-125' : 'bg-mintBrand'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 