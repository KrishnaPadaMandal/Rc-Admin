import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/common/Sidebar";
import { useDeleteService, useGetAllServices } from "../../api/servicesAPI";
import ServiceTable from "../../components/Services/ServiceTable";
import { useTheme } from "../../context/ThemeProvider";

const ServicePage = () => {
  const { theme } = useTheme();

  const {
    allServices,
    isError: isListError,
    isSuccess: isListSuccess,
    refetch: refetchServices,
  } = useGetAllServices();

  const deleteServiceMutation = useDeleteService();

  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (isListSuccess && !isListError) {
      setListData(allServices.data);
      toast.success(allServices.message);
    }
  }, [allServices, isListSuccess, isListError]);

  useEffect(() => {
    refetchServices();
  }, [refetchServices]);

  if (isListError) toast.error(allServices.message);

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
          className={`absolute inset-0 bg-gradient-to-br ${
            theme === "dark"
              ? "from-gray-900 via-gray-800 to-gray-900 opacity-80"
              : "from-white via-gray-100 to-white opacity-90"
          }`}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Services" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <ServiceTable
            serviceData={listData}
            onDelete={deleteServiceMutation.mutate}
          />
        </main>
      </div>
    </div>
  );
};

export default ServicePage;
