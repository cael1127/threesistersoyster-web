"use client";
import Image from "next/image";

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
  return (
    <div className="py-6 md:py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Meet Our Team</h2>
      <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 scrollbar-hide">
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