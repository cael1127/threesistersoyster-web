"use client";
import Image from "next/image";

const workers = [
  {
    name: "Blake Whitney",
    role: "Owner",
    description: "Oversees oyster cultivation and harvest.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Hayden placeholder",
    role: "Farm Manager",
    description: "Ensures smooth oyster cultivation and harvest.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Kathryn Planceholder",
    role: "Nursery Manager",
    description: "Manages the nursery and oyster larvae.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Celco placeholder",
    role: "Farm Hand",
    description: "Operates the farm in addition to heading opperations",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Lorenzo placeholder",
    role: "Farm Hand",
    description: "Placeholder",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Adam placeholder",
    role: "Farm Hand",
    description: "Placeholder",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Macie placeholder",
    role: "Farm Hand/Diver",
    description: "Placeholder",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Andrew placeholder",
    role: "Farm Hand/Carpenter",
    description: "Placeholder",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Cael Findley",
    role: "Farm Hand/Software Developer",
    description: "Placeholder",
    image: "/placeholder-user.jpg",
  },
];

export default function TeamScroller() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4">
        {workers.map((worker, idx) => (
          <div
            key={idx}
            className="min-w-[220px] bg-white rounded-lg shadow p-4 flex-shrink-0"
          >
            <Image
              src={worker.image}
              alt={worker.name}
              width={120}
              height={120}
              className="rounded-full object-cover mx-auto"
            />
            <h3 className="mt-4 text-lg font-semibold text-center">{worker.name}</h3>
            <p className="text-sm text-gray-500 text-center">{worker.role}</p>
            <p className="mt-2 text-xs text-gray-700 text-center">{worker.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 