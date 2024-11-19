import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../components/common/Sidebar";
import {
  useCreateService,
  useGetService,
  useUpdateService,
} from "../../api/servicesAPI";
import ServiceForm from "../../components/Services/ServiceForm";
import Header from "../../components/common/Header";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a theme context

const ServiceNewPage = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState({});
  const { service, isError, isSuccess } = useGetService(id);
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();

  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    if (service && !isError) {
      setSingleData(service.data);
      toast.success(service.message);
    }
    if (id) {
      if (isError) {
        toast.error(
          service?.message ||
            "Failed to fetch service details. Please try again."
        );
      }
    }
  }, [service]);

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } text-gray-100 overflow-hidden`}
    >
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
              : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 opacity-80"
          }`}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={`${id ? "Edit" : "Add"} Services`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <ServiceForm
            singleData={singleData}
            onSave={id ? updateMutation.mutate : createMutation.mutate}
            id={id ? id : null}
          />
        </main>
      </div>
    </div>
  );
};

export default ServiceNewPage;
