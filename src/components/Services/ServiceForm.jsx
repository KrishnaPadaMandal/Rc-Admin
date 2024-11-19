import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import MyEditor from "../common/CKEditor";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a theme context

const ServiceForm = ({ singleData, onSave, id }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [iconPreview, setIconPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    if (singleData) {
      setTitle(singleData.title || "");
      setIcon(singleData.icon || "");
      setImage(singleData.image || "");
      setShortDescription(singleData.shortDescription || "");
      setLongDescription(singleData.longDescription || "");
    }
  }, [singleData]);

  const formData = new FormData();
  if (image) formData.append("image", image);
  if (icon) formData.append("icon", icon);
  formData.append("id", id);
  formData.append("title", title);
  formData.append("shortDescription", shortDescription);
  formData.append("longDescription", longDescription);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      onSave(formData, {
        onSuccess: () => {
          if (id) {
            toast.success("Service updated successfully.");
          } else {
            toast.success("Service created successfully.");
          }
          navigate("/services");
        },
        onError: () => {
          toast.error("Failed to save service. Please try again.");
        },
      });
    } catch (error) {
      toast.error("Failed to save service. Please try again.");
    }
  };

  return (
    <motion.form
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      } bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8`}
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
              placeHolder="Title"
            />

            <div className="sm:col-span-3">
              <label
                className={`block text-sm font-medium leading-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Icon
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    name="icon"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleIconChange}
                  />
                </div>
              </div>
            </div>
            {iconPreview ? (
              <img
                src={iconPreview}
                alt="Icon Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <img
                src={singleData?.icon}
                alt="Icon Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            )}

            <div className="sm:col-span-3">
              <label
                className={`block text-sm font-medium leading-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Image
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    name="image"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <img
                src={singleData?.image}
                alt="Image Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            )}

            <MyEditor
              fieldName="Short Description"
              fieldValue={shortDescription}
              setValue={setShortDescription}
            />

            <MyEditor
              fieldName="Long Description"
              fieldValue={longDescription}
              setValue={setLongDescription}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/services"
          type="button"
          className={`${
            theme === "dark" ? "bg-red-600" : "bg-red-500"
          } rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        >
          Back
        </Link>
        <button
          type="submit"
          className={`${
            theme === "dark" ? "bg-indigo-600" : "bg-indigo-500"
          } rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          Save
        </button>
      </div>
    </motion.form>
  );
};

export default ServiceForm;
