import { useEffect, useState } from "react";
import AboutForm from "../../components/about/AboutForm";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCreateAbout,
  useGetAbout,
  useUpdateAbout,
} from "../../api/aboutAPI";
import Sidebar from "../../components/common/Sidebar";
import { useTheme } from "../../context/ThemeProvider"; 

const AboutNewPage = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState({});

  const { about, isError } = useGetAbout(id);
  const createMutation = useCreateAbout();
  const updateMutation = useUpdateAbout();
  const { theme } = useTheme(); 
  useEffect(() => {
    if (about && !isError) {
      setSingleData(about.data);
      toast.success(about.message || "About details fetched successfully.");
    }
    if (id) {
      if (isError) {
        toast.error(
          about?.message || "Failed to fetch about details. Please try again."
        );
      }
    }
  }, [about]);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* BG */}
      <div
        className={`fixed inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
            : "bg-gradient-to-br from-white via-gray-100 to-white opacity-80"
        }`}
      />
      <div className={`absolute inset-0 backdrop-blur-sm ${theme === "dark" ? "bg-gray-900" : "bg-white"}`} />

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={`${id ? "Edit" : "Add"} About`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <AboutForm
            singleData={singleData}
            onSave={id ? updateMutation.mutate : createMutation.mutate}
            id={id ? id : null}
          />
        </main>
      </div>
    </div>
  );
};

export default AboutNewPage;
