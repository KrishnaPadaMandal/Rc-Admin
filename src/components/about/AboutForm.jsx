import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import MyEditor from "../common/CKEditor";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a ThemeProvider

const AboutForm = ({ singleData, onSave, id }) => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme
  const [title, setTitle] = useState("");
  const [aboutType, setAboutType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (singleData) {
      setTitle(singleData.title || "");
      setAboutType(singleData.aboutType || "");
      setDescription(singleData.description || "");
    }
  }, [singleData]);

  const payload = {
    id,
    title,
    aboutType,
    description,
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      onSave(payload);

      if (id) {
        toast.success("About updated successfully.");
      } else {
        toast.success("About created successfully.");
      }

      navigate("/about");
    } catch (error) {
      toast.error("Failed to save about. Please try again.");
    }
  };

  return (
    <motion.form
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900"
      } bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border ${
        theme === "dark" ? "border-gray-700" : "border-gray-300"
      } mb-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              fieldName="Title"
              fieldValue={title}
              setValue={setTitle}
              fieldType="text"
              placeHolder="title"
            />

            <Input
              fieldName="About Type"
              fieldValue={aboutType}
              setValue={setAboutType}
              fieldType="text"
              placeHolder="aboutType"
            />

            <MyEditor
              fieldName="Description"
              fieldValue={description}
              setValue={setDescription}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/about"
          type="button"
          className={`rounded-md ${
            theme === "dark"
              ? "bg-red-600 hover:bg-red-500"
              : "bg-red-600 hover:bg-red-500"
          } px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        >
          Back
        </Link>
        <button
          type="submit"
          className={`rounded-md ${
            theme === "dark"
              ? "bg-indigo-600 hover:bg-indigo-500"
              : "bg-indigo-600 hover:bg-indigo-500"
          } px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          Save
        </button>
      </div>
    </motion.form>
  );
};

export default AboutForm;
