import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteContact, useGetContact } from "../../api/contactAPI";
import ContactTable from "../../components/Contact/ContactTable";
import Sidebar from "../../components/common/Sidebar";
import { useTheme } from "../../context/ThemeProvider";

const ContactPage = () => {
  const { theme } = useTheme(); 
  const {
    contact,
    isError,
    isSuccess,
    refetch: refetchContact,
  } = useGetContact();

  const deleteContactMutation = useDeleteContact();

  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (isSuccess && !isError) {
      setListData(contact.data);
      toast.success(contact.message);
    }
  }, [contact, isSuccess, isError]);

  useEffect(() => {
    refetchContact();
  }, [refetchContact]);

  if (isError) toast.error(contact.message);

  return (
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } overflow-hidden`}
    >
      {/* BG */}
      <div
        className={`fixed inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
            : "bg-gradient-to-br from-white via-gray-100 to-gray-100 opacity-80"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          theme === "dark" ? "backdrop-blur-sm" : "backdrop-blur-md"
        }`}
      />

      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Contact US" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <ContactTable
            contactData={listData}
            onDelete={deleteContactMutation.mutate}
          />
        </main>
      </div>
    </div>
  );
};

export default ContactPage;
