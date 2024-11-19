import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MyEditor from "../common/CKEditor";
import Input from "../common/Input";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a ThemeProvider

const BlogForm = ({ singleData, onSave, id }) => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme from context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogType, setBlogType] = useState("");
  const [date, setDate] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (singleData) {
      setTitle(singleData.title || "");
      setDescription(singleData.description || "");
      setBlogType(singleData.blogType || "");
      setDate(singleData.date || "");
      setPostedBy(singleData.postedBy || "");
      setImage(singleData.image || "");
    }
  }, [singleData]);

  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("id", id);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("blogType", blogType);
  formData.append("date", date);
  formData.append("postedBy", postedBy);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      onSave(formData, {
        onSuccess: () => {
          if (id) {
            toast.success("Blog updated successfully.");
          } else {
            toast.success("Blog created successfully.");
          }
          navigate("/blog");
        },
        onError: () => {
          toast.error("Failed to save blog. Please try again.");
        },
      });
    } catch (error) {
      toast.error("Failed to save blog. Please try again.");
    }
  };

  return (
    <motion.form
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900"
      } bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className={`sm:col-span-3`}>
              <label className="block text-sm font-medium leading-6">
                Image
              </label>
              <div className="mt-2">
                <div
                  className={`flex rounded-md shadow-sm ring-1 ring-inset ${
                    theme === "dark"
                      ? "ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                      : "ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  } sm:max-w-md`}
                >
                  <input
                    type="file"
                    name="image"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            {imagePreview ? (
              <div className="sm:col-span-3">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            ) : (
              <div className="sm:col-span-3">
                <img
                  src={singleData?.image}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}

            <Input
              fieldName="Title"
              fieldValue={title}
              setValue={setTitle}
              fieldType="text"
              placeHolder="title"
            />

            <MyEditor
              fieldName="Description"
              fieldValue={description}
              setValue={setDescription}
            />

            <Input
              fieldName="Blog Type"
              fieldValue={blogType}
              setValue={setBlogType}
              fieldType="text"
              placeHolder="Blog Type"
            />

            <Input
              fieldName="Date"
              fieldValue={date}
              setValue={setDate}
              fieldType="date"
              placeHolder="Date"
            />

            <Input
              fieldName="Posted By"
              fieldValue={postedBy}
              setValue={setPostedBy}
              fieldType="text"
              placeHolder="Posted By"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/blog"
          type="button"
          className={`rounded-md ${
            theme === "dark" ? "bg-red-600" : "bg-red-500"
          } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        >
          Back
        </Link>
        <button
          type="submit"
          className={`rounded-md ${
            theme === "dark" ? "bg-indigo-600" : "bg-indigo-500"
          } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          Save
        </button>
      </div>
    </motion.form>
  );
};

export default BlogForm;
