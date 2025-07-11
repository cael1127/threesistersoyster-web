"use client";
import Image from "next/image";

const workers = [
  {
    name: "Blake Whitney",
    role: "Owner",
    description: "Placeholder",
    image: "/blake.jpg",
  },
  {
    name: "Dan Whitney",
    role: "Placeholder",
    description: "Placeholder",
    image: "/logo.jpg",
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
    image: "/kath.jpg",
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
    name: "Adam placeholder",
    role: "Placeholder",
    description: "Placeholder",
    image: "/logo.jpg",
  },
  {
    name: "Macie placeholder",
    role: "Placeholder",
    description: "Placeholder",
    image: "/logo.jpg",
  },
  {
    name: "Andrew placeholder",
    role: "Placeholder",
    description: "Placeholder",
    image: "/logo.jpg",
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
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4">
                <Image
                  src={worker.image}
                  alt={worker.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-center mb-1 md:mb-2 leading-tight">{worker.name}</h3>
              <p className="text-xs md:text-sm text-gray-500 text-center mb-2 md:mb-3 leading-tight">{worker.role}</p>
              <p className="text-xs md:text-sm text-gray-700 text-center leading-relaxed">{worker.description}</p>
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