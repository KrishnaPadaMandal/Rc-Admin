import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider"; // Import theme context

const OverviewPage = () => {
  const { authUser } = useAuth();
  const { theme } = useTheme(); // Get current theme

  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      {/* BG */}
      <div className={`fixed inset-0 z-0 ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" : "bg-gradient-to-br from-gray-100 via-white to-gray-100 opacity-80"}`}>
        <div className={`absolute inset-0 backdrop-blur-sm ${theme === "dark" ? "bg-gray-900" : "bg-white"}`} />
      </div>

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Overview" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Sales"
              icon={Zap}
              value="$12,345"
              color="#6366F1"
            />
            <StatCard
              name="New Users"
              icon={Users}
              value="1,234"
              color="#8B5CF6"
            />
            <StatCard
              name="Total Products"
              icon={ShoppingBag}
              value="567"
              color="#EC4899"
            />
            <StatCard
              name="Conversion Rate"
              icon={BarChart2}
              value="12.5%"
              color="#10B981"
            />
          </motion.div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalesOverviewChart />
            <CategoryDistributionChart />
            <SalesChannelChart />
          </div>
        </main>
      </div>
    </div>
  );
};
export default OverviewPage;
