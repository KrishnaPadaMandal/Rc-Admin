import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "../../context/ThemeProvider";

const categoryData = [
  { name: "Electronics", value: 4500 },
  { name: "Clothing", value: 3200 },
  { name: "Home & Garden", value: 2800 },
  { name: "Books", value: 2100 },
  { name: "Sports & Outdoors", value: 1900 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
  const { theme } = useTheme(); // Get the current theme

  // Define colors based on the theme
  const tooltipBgColor =
    theme === "dark" ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)";
  const tooltipBorderColor = theme === "dark" ? "#4B5563" : "#E5E7EB";
  const tooltipItemColor = theme === "dark" ? "#E5E7EB" : "#1F2937";
  const legendTextColor = theme === "dark" ? "#E5E7EB" : "#1F2937";
  const chartBgColor = theme === "dark" ? "#1F2937" : "#F9FAFB"; // Dark or light background

  return (
    <motion.div
      className={`p-6 border rounded-xl shadow-lg ${
        theme === "dark"
          ? "bg-gray-800 bg-opacity-50"
          : "bg-white bg-opacity-75"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2
        className={`text-lg font-medium mb-4 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Category Distribution
      </h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBgColor,
                borderColor: tooltipBorderColor,
              }}
              itemStyle={{ color: tooltipItemColor }}
            />
            <Legend wrapperStyle={{ color: legendTextColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
