import {
  FiStar,
  FiAward,
  FiShield,
  FiCheck,
  FiZap,
  FiThumbsUp,
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiActivity,
  FiTarget,
  FiCpu,
  FiCode,
  FiTool,
  FiMonitor,
  FiLayers,
  FiCloud,
  FiTrendingUp,
  FiBarChart2,
  FiDollarSign,
  FiCompass,
  FiSmile,
  FiHeart,
  FiPhone,
  FiMessageCircle,
  FiHelpCircle,
  FiCalendar,
  FiBook,
  FiEdit,
  FiSettings,
  FiRefreshCcw,
  FiDroplet,
  FiSun,
  FiMoon,
  FiSmartphone,
  FiPhoneCall,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiBattery,
  FiGlobe,
  FiWifi,
  FiPenTool,
  FiFeather,
  FiCamera,
  FiImage,
  FiVideo,
  FiBookOpen,
  
  
} from "react-icons/fi";

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FiStar,
  FiAward,
  FiShield,
  FiCheck,
  FiZap,
  FiThumbsUp,
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiActivity,
  FiTarget,
  FiCpu,
  FiCode,
  FiTool,
  FiMonitor,
  FiLayers,
  FiCloud,
  FiTrendingUp,
  FiBarChart2,
  FiDollarSign,
  FiCompass,
  FiSmile,
  FiHeart,
  FiPhone,
  FiMessageCircle,
  FiHelpCircle,
  FiCalendar,
  FiBook,
  FiEdit,
  FiSettings,
  FiRefreshCcw,
  FiDroplet,
  FiSun,
  FiMoon,
  FiSmartphone,
  FiPhoneCall,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiBattery,
  FiGlobe,
  FiWifi,
  FiPenTool,
  FiFeather,
  FiCamera,
  FiImage,
  FiVideo,
  FiBookOpen,
  
};



export type IconKey = keyof typeof iconMap;

interface IconSelectorProps {
  selected?: string;
  onSelect: (icon: string) => void;
}

export const IconSelector = ({ selected, onSelect }: IconSelectorProps) => {
  const iconList = Object.keys(iconMap) as IconKey[];

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
      <div className="grid grid-cols-4 gap-3">
        {iconList.map((iconName) => (
          <button
            key={iconName}
            onClick={() => onSelect(iconName)} // ✅ Guardamos el nombre en lugar del objeto
            className={`p-3 rounded-lg flex items-center justify-center transition-all ${
              selected === iconName
                ? "bg-primario text-white border-2 border-blue-300 shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-gray-200 focus:outline-3 focus:outline-offset-2 focus:outline-primario active:bg-primario active:text-white hover:shadow-md"
            }`}
          >
            {iconMap[iconName]({ className: "w-6 h-6" })} {/* ✅ Renderizar el ícono correctamente */}
          </button>
        ))}
      </div>
    </div>
  );
};
