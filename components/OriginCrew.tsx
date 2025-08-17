"use client";
import Image from "next/image";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { useState } from "react";
import { MapPin, Users, Leaf, Waves, Star, Heart } from "lucide-react";

const originCrew = [
  {
    name: "Blake Whitney",
    role: "Owner & Founder",
    description: "Blake founded Three Sisters Oyster Co. with a vision for sustainable aquaculture. With his background in Range and Wildlife Management, he leads our environmental stewardship efforts and farm operations.",
    image: "/blake.jpg",
    icon: Star,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-100 to-purple-200",
    borderColor: "border-purple-300",
    hoverBorderColor: "group-hover:border-purple-400"
  },
  {
    name: "Dan Whitney",
    role: "Senior Advisor",
    description: "Dan oversees daily farm operations and logistics. His expertise in coastal operations ensures smooth coordination between our nursery and farm sites in Keller Bay.",
    image: "/danc.jpg",
    icon: MapPin,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-100 to-blue-200",
    borderColor: "border-blue-300",
    hoverBorderColor: "group-hover:border-blue-400"
  },
  {
    name: "Hayden Warren",
    role: "Farm Manager",
    description: "Hayden manages our grow-out operations and coordinates harvest schedules. His hands-on approach ensures our oysters reach market at peak quality and size.",
    image: "/hayden.jpg",
    icon: Leaf,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-100 to-green-200",
    borderColor: "border-green-300",
    hoverBorderColor: "group-hover:border-green-400"
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
    hoverBorderColor: "group-hover:border-pink-400"
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
    hoverBorderColor: "group-hover:border-teal-400"
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
    hoverBorderColor: "group-hover:border-cyan-400"
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
    hoverBorderColor: "group-hover:border-emerald-400"
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
    hoverBorderColor: "group-hover:border-indigo-400"
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
    hoverBorderColor: "group-hover:border-violet-400"
  },
];

export default function OriginCrew() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-seafoamBrand to-blueBrand relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingParticles particleCount={8} interactive={false} />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-teal-400 to-green-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
          {originCrew.map((member, idx) => {
            const IconComponent = member.icon;
            return (
              <div
                key={idx}
                className={`relative bg-white border-2 ${member.borderColor} ${member.hoverBorderColor} rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden cursor-pointer`}
                onClick={() => setSelectedMember(selectedMember === idx ? null : idx)}
                onMouseEnter={() => setSelectedMember(idx)}
                onMouseLeave={() => setSelectedMember(null)}
              >
                {/* Role Icon Badge */}
                <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Member Photo */}
                <div className="relative mb-6 z-10">
                  <div className={`w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 ${member.borderColor} ${member.hoverBorderColor} transition-all duration-300 aspect-square relative`}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      quality={100}
                    />
                    
                    {/* Glowing overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full`}></div>
                  </div>
                  
                  {/* Animated decorative rings */}
                  <div className={`absolute inset-0 rounded-full border-2 ${member.borderColor} ${member.hoverBorderColor} transition-all duration-300`}></div>
                  <div className={`absolute inset-2 rounded-full border border-dashed ${member.borderColor} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                </div>

                {/* Member Info */}
                <div className="text-center relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-900 mb-2 group-hover:text-purple-800 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className={`text-lg md:text-xl font-semibold mb-4 transition-colors duration-300 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                    {member.role}
                  </p>
                  <p className={`text-purple-700 text-sm md:text-base leading-relaxed group-hover:text-purple-800 transition-colors duration-300 ${
                    selectedMember === idx ? 'line-clamp-none' : 'line-clamp-3'
                  }`}>
                    {member.description}
                  </p>
                </div>

                {/* Enhanced hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${member.bgColor} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
                
                {/* Floating particles around the card */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute top-2 left-2 w-2 h-2 bg-gradient-to-r ${member.color} rounded-full opacity-0 group-hover:opacity-100 animate-pulse`}></div>
                  <div className={`absolute top-4 right-8 w-1 h-1 bg-gradient-to-r ${member.color} rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-100`}></div>
                  <div className={`absolute bottom-6 left-6 w-1.5 h-1.5 bg-gradient-to-r ${member.color} rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-200`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg md:text-xl text-purple-800 mb-6">
            Together, we're building the future of sustainable oyster farming in Texas.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg">
            <Heart className="w-5 h-5 mr-2" />
            Proud to be part of the Three Sisters family
          </div>
        </div>
      </div>
    </section>
  );
} 