import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateUser, useGetUser, useUpdateUser } from "../../api/userAPI";
import toast from "react-hot-toast";
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";
import UserForm from "../../components/users/UserForm";
import { useTheme } from "../../context/ThemeProvider"; // Assuming a theme context is provided

const UserNewPage = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState({});
  const { theme } = useTheme(); // Get current theme (light or dark)

  const { user, isError } = useGetUser(id);
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  useEffect(() => {
    if (user && !isError) {
      setSingleData(user.data);
      toast.success(user.message);
    }

    if (id) {
      if (isError) {
        toast.error(
          user?.message || "Failed to fetch user details. Please try again."
        );
      }
    }
  }, [user, id, isError]);

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
              : "bg-gradient-to-br from-white via-gray-100 to-white opacity-80"
          }`}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={`${id ? "Edit" : "Add"} User`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <UserForm
            singleData={singleData}
            onSave={id ? updateMutation.mutate : createMutation.mutate}
            id={id ? id : null}
          />
        </main>
      </div>
    </div>
  );
};

export default UserNewPage;
