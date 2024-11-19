import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import UsersTable from "../../components/users/UsersTable";
import UserGrowthChart from "../../components/users/UserGrowthChart";
import UserActivityHeatmap from "../../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../../components/users/UserDemographicsChart";
import Sidebar from "../../components/common/Sidebar";
import { useDeleteUser, useGetAllUser } from "../../api/userAPI";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeProvider";

const UsersPage = () => {
  const { theme } = useTheme(); // Get current theme (light or dark)

  const {
    allUser,
    isError: isListError,
    isSuccess: isListSuccess,
    refetch: refetchUser,
  } = useGetAllUser();

  const deleteUserMutation = useDeleteUser();

  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (isListSuccess && !isListError) {
      setListData(allUser?.data?.users);
      toast.success(allUser.message);
    }
  }, [allUser, isListSuccess, isListError]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  if (isListError) toast.error(allUser.message);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
              : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 opacity-80"
          }`}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Users" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Users"
              icon={UsersIcon}
              value={allUser?.data?.count}
              color="#6366F1"
            />
            <StatCard
              name="New Users Today"
              icon={UserPlus}
              value={allUser?.data?.todayNewUsers}
              color="#10B981"
            />
            <StatCard
              name="Active Users"
              icon={UserCheck}
              value={allUser?.data?.activeUsers}
              color="#F59E0B"
            />
            <StatCard
              name="Churn Rate"
              icon={UserX}
              value={"2.4%"}
              color="#EF4444"
            />
          </motion.div>

          <UsersTable
            userData={listData}
            onDelete={deleteUserMutation.mutate}
          />

          {/* USER CHARTS */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <UserGrowthChart />
            <UserActivityHeatmap />
            <UserDemographicsChart />
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default UsersPage;
