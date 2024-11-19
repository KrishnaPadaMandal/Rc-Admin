import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider";

const salesData = [
  { name: "Jul", sales: 4200 },
  { name: "Aug", sales: 3800 },
  { name: "Sep", sales: 5100 },
  { name: "Oct", sales: 4600 },
  { name: "Nov", sales: 5400 },
  { name: "Dec", sales: 7200 },
  { name: "Jan", sales: 6100 },
  { name: "Feb", sales: 5900 },
  { name: "Mar", sales: 6800 },
  { name: "Apr", sales: 6300 },
  { name: "May", sales: 7100 },
  { name: "Jun", sales: 7500 },
];

const SalesOverviewChart = () => {
  const { theme } = useTheme(); // Get current theme

  // Define color variables based on the theme
  const gridColor = theme === "dark" ? "#4B5563" : "#E5E7EB";
  const axisColor = theme === "dark" ? "#9ca3af" : "#4B5563";
  const lineColor = "#6366F1";
  const tooltipBgColor = theme === "dark" ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)";
  const tooltipBorderColor = theme === "dark" ? "#4B5563" : "#E5E7EB";
  const tooltipItemColor = theme === "dark" ? "#E5E7EB" : "#1F2937";

  return (
    <motion.div
      className={`p-6 border rounded-xl shadow-lg ${theme === "dark" ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-75"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className={`text-lg font-medium mb-4 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
        Sales Overview
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBgColor,
                borderColor: tooltipBorderColor,
              }}
              itemStyle={{ color: tooltipItemColor }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke={lineColor}
              strokeWidth={3}
              dot={{ fill: lineColor, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
