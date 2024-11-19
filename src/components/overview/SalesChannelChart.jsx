import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { useTheme } from "../../context/ThemeProvider";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const SALES_CHANNEL_DATA = [
  { name: "Website", value: 45600 },
  { name: "Mobile App", value: 38200 },
  { name: "Marketplace", value: 29800 },
  { name: "Social Media", value: 18700 },
];

const SalesChannelChart = () => {
  const { theme } = useTheme(); // Get the current theme

  // Define colors based on the theme
  const gridColor = theme === "dark" ? "#4B5563" : "#D1D5DB"; // Grid color for dark and light modes
  const axisStrokeColor = theme === "dark" ? "#9CA3AF" : "#1F2937"; // Axis color for dark and light modes
  const tooltipBgColor =
    theme === "dark" ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)";
  const tooltipBorderColor = theme === "dark" ? "#4B5563" : "#E5E7EB";
  const tooltipItemColor = theme === "dark" ? "#E5E7EB" : "#1F2937";
  const legendTextColor = theme === "dark" ? "#E5E7EB" : "#1F2937";
  const chartBgColor = theme === "dark" ? "#1F2937" : "#F9FAFB"; // Dark or light background

  return (
    <motion.div
      className={`p-6 rounded-xl shadow-lg lg:col-span-2 border ${
        theme === "dark"
          ? "bg-gray-800 bg-opacity-50"
          : "bg-white bg-opacity-75"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2
        className={`text-lg font-medium mb-4 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Sales by Channel
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={SALES_CHANNEL_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={axisStrokeColor} />
            <YAxis stroke={axisStrokeColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBgColor,
                borderColor: tooltipBorderColor,
              }}
              itemStyle={{ color: tooltipItemColor }}
            />
            <Legend wrapperStyle={{ color: legendTextColor }} />
            <Bar dataKey={"value"} fill="#8884d8">
              {SALES_CHANNEL_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
