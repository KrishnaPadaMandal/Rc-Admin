import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCreateContact,
  useGetContact,
  useUpdateContact,
} from "../../api/contactAPI";
import ContactForm from "../../components/Contact/ContactForm";
import Sidebar from "../../components/common/Sidebar";
import { useTheme } from "../../context/ThemeProvider"; // Assuming useTheme provides the current theme

const ContactNewPage = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState({});
  const { theme } = useTheme(); // Get current theme from context

  const { contact, isError } = useGetContact();
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();

  useEffect(() => {
    if (contact && !isError) {
      setSingleData(contact.data[0]);
      toast.success(contact.message);
    }
    if (id) {
      if (isError) {
        toast.error(
          contact?.message ||
            "Failed to fetch contact details. Please try again."
        );
      }
    }
  }, [contact]);

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
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
              : "bg-gradient-to-br from-white via-gray-200 to-gray-300 opacity-80"
          }`}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        <Header title={`${id ? "Edit" : "Add"} Contact`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <ContactForm
            singleData={singleData}
            onSave={id ? updateMutation.mutate : createMutation.mutate}
            id={id ? id : null}
          />
        </main>
      </div>
    </div>
  );
};

export default ContactNewPage;
