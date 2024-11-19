import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider";

const StatCard = ({ name, icon: Icon, value, color }) => {
  const { theme } = useTheme(); // Get current theme

  return (
    <motion.div
      className={`overflow-hidden shadow-lg rounded-xl border ${
        theme === "dark"
          ? "bg-gray-800 bg-opacity-50 border-gray-700"
          : "bg-white bg-opacity-75 border-gray-200"
      }`}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className={`px-4 py-5 sm:p-6 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <span
          className={`flex items-center text-sm font-medium ${
            theme === "dark" ? "text-gray-400" : "text-gray-700"
          }`}
        >
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p
          className={`mt-1 text-3xl font-semibold ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
};
export default StatCard;
