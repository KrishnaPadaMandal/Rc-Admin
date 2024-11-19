import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../components/common/Sidebar";
import { useCreateBlog, useGetBlog, useUpdateBlog } from "../../api/blogAPI";
import BlogForm from "../../components/Blog/BlogForm";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a ThemeProvider

const BlogNewPage = () => {
  let { id } = useParams();
  const { theme } = useTheme(); // Get the current theme
  const [singleData, setSingleData] = useState({});

  const { blog, isError } = useGetBlog(id);
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();

  useEffect(() => {
    if (blog && !isError) {
      setSingleData(blog.data);
      toast.success(blog.message || "Blog details fetched successfully.");
    }
    if (id) {
      if (isError) {
        toast.error(
          blog?.message || "Failed to fetch blog details. Please try again."
        );
      }
    }
  }, [blog]);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* BG */}
      <div
        className={`fixed inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"
            : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 opacity-80"
        }`}
      />
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          theme === "dark" ? "bg-gray-900 opacity-60" : "bg-gray-100 opacity-60"
        }`}
      />

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={`${id ? "Edit" : "Add"} Blog`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <BlogForm
            singleData={singleData}
            onSave={id ? updateMutation.mutate : createMutation.mutate}
            id={id ? id : null}
          />
        </main>
      </div>
    </div>
  );
};

export default BlogNewPage;
