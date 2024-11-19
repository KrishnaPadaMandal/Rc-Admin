import {
  BarChart2,
  AtSignIcon,
  Contact2,
  FileTextIcon,
  Users,
  ServerIcon,
  Settings,
  UserCheck,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider"; // Import the theme context

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
  { name: "About", icon: AtSignIcon, color: "#f8ed03", href: "/about" },
  { name: "Blog", icon: FileTextIcon, color: "#10B981", href: "/blog" },
  { name: "Our Team", icon: UserCheck, color: "#4caf50", href: "/our-team" },
  { name: "Contact US", icon: Contact2, color: "#ff5733", href: "/contact" },
  { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Services", icon: ServerIcon, color: "#d8eb34", href: "/services" },
  { name: "Site Setting", icon: Settings, color: "#6EE7B7", href: "/site-setting" },
  // { name: "LightMode", icon: Settings, color: "#6EE7B7", href: "/light-mood" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useTheme(); // Access the current theme from context

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      } ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div
        className={`h-full ${
          theme === "dark" ? "bg-gray-800 bg-opacity-50 border-gray-700" : "bg-white bg-opacity-50 border-gray-300"
        } backdrop-blur-md p-4 flex flex-col border-r`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit ${
            theme === "dark" ? "text-gray-200" : "text-gray-900"
          }`}
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-900"
                }`}
              >
                <item.icon
                  size={20}
                  style={{
                    color: item.color,
                    minWidth: "20px",
                  }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
