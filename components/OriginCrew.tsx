"use client";
import Image from "next/image";

const originCrew = [
  {
    name: "Blake Whitney",
    role: "Owner & Founder",
    description: "Blake founded Three Sisters Oyster Co. with a vision for sustainable aquaculture. With his background in Range and Wildlife Management, he leads our environmental stewardship efforts and farm operations.",
    image: "/blake.jpg",
  },
  {
    name: "Dan Whitney",
    role: "Senior Advisor",
    description: "Dan oversees daily farm operations and logistics. His expertise in coastal operations ensures smooth coordination between our nursery and farm sites in Keller Bay.",
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
    name: "Celco",
    role: "Farm Hand",
    description: "Celco brings years of coastal work experience to our team. He specializes in equipment maintenance and boat operations, keeping our fleet running smoothly.",
    image: "/logo.jpg",
  },
  {
    name: "Lorenzo",
    role: "Farm Hand",
    description: "Lorenzo is skilled in oyster handling and grading. His expertise in shellfish care helps maintain the high quality standards Three Sisters is known for.",
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
    description: "Andrew assists with daily farm operations and oyster processing. His dedication to sustainable practices aligns perfectly with our environmental mission.",
    image: "/andrew.JPEG",
  },
  {
    name: "Cael Findley",
    role: "Software Developer",
    description: "Cael develops and maintains our digital infrastructure, including inventory tracking systems and our e-commerce platform. He helps modernize our operations through technology.",
    image: "/logo.jpg",
  },
];

export default function OriginCrew() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-seafoamBrand to-blueBrand">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
            Our Origin Crew
          </h2>
          <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated team that built Three Sisters Oyster Co. from the ground up. 
            Each member brings unique expertise and passion to our sustainable aquaculture mission.
          </p>
        </div>

        {/* Crew Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {originCrew.map((member, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-purple-200 rounded-2xl p-6 md:p-8 hover:bg-purple-50 transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              {/* Member Photo */}
              <div className="relative mb-6 z-10">
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-purple-300 group-hover:border-purple-400 transition-all duration-300 aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    quality={100}
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-200 group-hover:border-purple-300 transition-all duration-300"></div>
              </div>

              {/* Member Info */}
              <div className="text-center relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-purple-900 mb-2 group-hover:text-purple-800 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-lg md:text-xl text-purple-700 font-semibold mb-4 group-hover:text-purple-800 transition-colors duration-300">
                  {member.role}
                </p>
                <p className="text-purple-700 text-sm md:text-base leading-relaxed group-hover:text-purple-800 transition-colors duration-300">
                  {member.description}
                </p>
              </div>

              {/* Hover effect overlay - darker and more subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg md:text-xl text-purple-800 mb-6">
            Together, we're building the future of sustainable oyster farming in Texas.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300">
            Proud to be part of the Three Sisters family
          </div>
        </div>
      </div>
    </section>
  );
} 