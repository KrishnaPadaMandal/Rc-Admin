import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/common/Sidebar";
import OurTeamTable from "../../components/Our Team/OurTeamTable";
import { useDeleteOurTeam, useGetAllOurTeam } from "../../api/ourTeamApi";
import { useTheme } from "../../context/ThemeProvider";

const OurTeamPage = () => {
  const { allOurTeam, isError, isSuccess, refetch } = useGetAllOurTeam();

  const { theme } = useTheme();

  const deleteTeamMutation = useDeleteOurTeam();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (isSuccess && !isError) {
      setListData(allOurTeam.data);
      toast.success(
        allOurTeam.message || "Our team details fetched successfully."
      );
    }
  }, [allOurTeam, isSuccess, isError]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isError)
    toast.error(allOurTeam.message || "Failed to fetch our team details.");

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Background */}
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
        <Header title="Our Team" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <OurTeamTable
            teamData={listData}
            onDelete={deleteTeamMutation.mutate}
          />
        </main>
      </div>
    </div>
  );
};

export default OurTeamPage;
