import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../components/common/Sidebar";
import {
  useCreateOurTeam,
  useGetOurTeam,
  useUpdateOurTeam,
} from "../../api/ourTeamApi";
import OurTeamFrom from "../../components/Our Team/OurTeamForm";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a ThemeProvider

const OurTeamNewPage = () => {
  let { id } = useParams();
  const { theme } = useTheme(); // Get the current theme from context

  const [singleData, setSingleData] = useState({});
  const { ourTeam, isError, isSuccess } = useGetOurTeam(id);

  const createMutation = useCreateOurTeam();
  const updateMutation = useUpdateOurTeam();

  useEffect(() => {
    if (ourTeam && !isError) {
      setSingleData(ourTeam.data);
      toast.success(
        ourTeam.message || "Our Team details fetched successfully."
      );
    }
    if (id) {
      if (isError) {
        toast.error(
          ourTeam?.message ||
            "Failed to fetch our team details. Please try again."
        );
      }
    }
  }, [ourTeam]);

  return (
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } overflow-hidden`}
    >
      {/* Background */}
      <div
        className={`fixed inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
            : "bg-gradient-to-br from-white via-gray-100 to-gray-200 opacity-80"
        }`}
      />
      <div className="absolute inset-0 backdrop-blur-sm" />

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={`${id ? "Edit" : "Add"} Team`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <OurTeamFrom
            singleData={singleData}
            onSave={id ? updateMutation.mutate : createMutation.mutate}
            id={id ? id : null}
          />
        </main>
      </div>
    </div>
  );
};

export default OurTeamNewPage;
