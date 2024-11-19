import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/common/Sidebar";
import { useDeleteBlog, useGetAllBlogs } from "../../api/blogAPI";
import BlogTable from "../../components/Blog/BlogTable";
import { useTheme } from "../../context/ThemeProvider"; // Import theme context

const BlogPage = () => {
  const {
    allBlogs,
    isError: isListError,
    isSuccess: isListSuccess,
    refetch: refetchBlog,
  } = useGetAllBlogs();

  const deleteBlogMutation = useDeleteBlog();

  const [listData, setListData] = useState([]);

  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    if (isListSuccess && !isListError) {
      setListData(allBlogs.data);
      toast.success(allBlogs.message);
    }
  }, [allBlogs, isListSuccess, isListError]);

  useEffect(() => {
    refetchBlog();
  }, [refetchBlog]);

  if (isListError) toast.error(allBlogs.message);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* BG */}
      <div className={`fixed inset-0 z-0 ${theme === "dark" ? "bg-gray-900 opacity-80" : "bg-gray-100 opacity-80"}`}>
        <div className={`absolute inset-0 backdrop-blur-sm ${theme === "dark" ? "bg-gray-900" : "bg-white"}`} />
      </div>

      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Blog" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <BlogTable blogData={listData} onDelete={deleteBlogMutation.mutate} />
        </main>
      </div>
    </div>
  );
};

export default BlogPage;
