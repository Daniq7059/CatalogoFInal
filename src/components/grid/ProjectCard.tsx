// ProjectCard.tsx
import * as AllIcons from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  odsIcon?: string;
  odsColor?: string;
  odsId?: number;
  onClick?: () => void;
  odsIcons?: { icon: string; color: string; title?: string }[]; // ahora incluye `title`

}

const truncateWords = (text: string, maxWords: number) => {
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};
const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};


const DynamicIcon = ({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size?: number;
}) => {
  const IconComponent = (AllIcons as any)[name];
  return IconComponent ? <IconComponent color={color} size={size} /> : null;
};

export const ProjectCard = ({
  title,
  category,
  image,
  odsIcons = [],
  onClick,
}: ProjectCardProps) => {
  const isMobile = useIsMobile();
  return (
    <div
    className="
    group relative shrink-0                       /* no se encoge */
    w-full  h-[240px]                          /* < 640 px */
    sm:w-[200px] sm:h-[300px]                     /* ≥ 640 px */
    md:w-[240px] md:h-[360px]                     /* ≥ 768 px */
    lg:w-[260px] lg:h-[390px]                     /* ≥1024 px */
    xl:w-[350px] xl:h-[420px]                     /* ≥1280 px */
    rounded-xl overflow-hidden 
    cursor-pointer transition-transform
    duration-300 hover:shadow-lg hover:scale-105
  "

      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="
          rounded-xl
          absolute inset-0
          w-full h-full object-cover
          transition-transform duration-3000
          
          hover:rounded-xl
          overflow-hidden
        "
      />
      <div
        className="
          absolute inset-0
          bg-black/50
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          z-10
          hover:scale-105
          hover:rounded-xl
          hover:shadow-lg 
          hover:-translate-y-2
          rounded-xl
        "
      />
      <div
        className="
          absolute inset-0 z-20 p-4 flex flex-col justify-between
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      >
        <div className="flex justify-between items-start">
          <div>
           <h3 className="text-white font-bold text-2xl sm:text-3xl whitespace-normal break-words leading-tight">
  {isMobile ? truncateWords(title, 4) : title}
</h3>

<div className="flex flex-wrap gap-2 mt-3">
  {category.split(",").map((cat, index) => (
    <span
      key={index}
      className="px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md animate-fade-in"
    >
      {cat.trim()}
    </span>
  ))}
</div>

          </div>
          <div className="flex gap-2 flex-wrap">
  {odsIcons?.map((ods, i) => (
  <div
    key={i}
    className="bg-white/90 p-2  rounded-full shadow"
    title={ods.title || "ODS"}
  >
    <DynamicIcon name={ods.icon} color={ods.color} size={24} />
  </div>
))}

</div>

        </div>
        <div className="flex justify-end">
          <button
            className="
              flex items-center gap-2 px-4 py-4
              bg-white/90 text-gray-900 hover:bg-white
              transition rounded-full text-xl font-medium shadow
            "
          >
            Ver Proyecto <FaArrowRight className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};
