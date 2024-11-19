import Header from "../../components/common/Header";
import { useDeleteAbout, useGetAllAbout } from "../../api/aboutAPI";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AboutTable from "../../components/about/AboutTable";
import Sidebar from "../../components/common/Sidebar";
import { useTheme } from "../../context/ThemeProvider";

const AboutPage = () => {
  const { theme } = useTheme(); // Get current theme
  const {
    allAbout,
    isError: isListError,
    isSuccess: isListSuccess,
    refetch: refetchAbout,
  } = useGetAllAbout();

  const deleteAboutMutation = useDeleteAbout();

  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (isListSuccess && !isListError) {
      setListData(allAbout.data);
      toast.success(allAbout.message);
    }
  }, [allAbout, isListSuccess, isListError]);

  useEffect(() => {
    refetchAbout();
  }, [refetchAbout]);

  if (isListError) toast.error(allAbout.message);

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
            : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 opacity-100"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          theme === "dark" ? "backdrop-blur-sm" : ""
        }`}
      />

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="About" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <AboutTable
            aboutData={listData}
            onDelete={deleteAboutMutation.mutate}
          />
        </main>
      </div>
    </div>
  );
};

export default AboutPage;
