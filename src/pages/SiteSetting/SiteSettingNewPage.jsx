import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetSiteSetting,
  useUpdateSiteSetting,
} from "../../api/siteSettingAPI";
import Sidebar from "../../components/common/Sidebar";
import SiteSettingForm from "../../components/Site-Setting/SiteSettingForm";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a theme context

const SiteSettingNewPage = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState({});

  const { siteSetting, isError, isSuccess, refetch } = useGetSiteSetting();
  const updateMutation = useUpdateSiteSetting();

  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    if (siteSetting && !isError) {
      setSingleData(siteSetting.data[0]);
      toast.success(siteSetting.message);
    }
    if (id) {
      if (isError) {
        toast.error(
          siteSetting?.message ||
            "Failed to fetch site setting details. Please try again."
        );
      }
    }
  }, [siteSetting]);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
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
        <Header title={`Edit Site Setting`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <SiteSettingForm
            singleData={singleData}
            onSave={updateMutation.mutate}
            id={id}
          />
        </main>
      </div>
    </div>
  );
};

export default SiteSettingNewPage;
