import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import toast from "react-hot-toast";
import { useGetSiteSetting } from "../../api/siteSettingAPI";
import SiteSettingTable from "../../components/Site-Setting/SiteSettingTable";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a ThemeProvider

const SiteSettingPage = () => {
  const { siteSetting, isError, isSuccess, refetch } = useGetSiteSetting();
  const [listData, setListData] = useState([]);

  // Access the current theme (light/dark)
  const { theme } = useTheme();

  useEffect(() => {
    if (isSuccess && !isError) {
      setListData(siteSetting.data);
      toast.success(siteSetting.message);
    }
  }, [siteSetting, isSuccess, isError]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isError) toast.error(siteSetting.message);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      {/* BG */}
      <div
        className={`fixed inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
            : "bg-gradient-to-br from-white via-gray-100 to-white opacity-80"
        }`}
      >
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Site Setting" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <SiteSettingTable siteSettingtData={listData} />
        </main>
      </div>
    </div>
  );
};

export default SiteSettingPage;
