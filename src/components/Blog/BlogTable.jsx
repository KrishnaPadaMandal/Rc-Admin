import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import truncateText from "../../utility/truncateText";
import replaceHtmlTag from "../../utility/replaceHtmlTag";
import { useTheme } from "../../context/ThemeProvider"; // Import theme context

const BlogTable = ({ blogData, onDelete }) => {
  const { theme } = useTheme(); // Get the current theme
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(blogData);
  }, [blogData]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = blogData.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.blogType.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  const handleEdit = (id) => () => {
    navigate(`/blog/${id}`);
  };

  const handleDelete = (id) => () => {
    confirm("Are you sure you want to delete this product?") &&
      onDelete(id, {
        onSuccess: () => {
          const updatedProducts = filteredProducts.filter(
            (product) => product._id !== id
          );

          setFilteredProducts(updatedProducts);

          toast.success("Blog deleted successfully...");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete blog...");
        },
      });
  };

  return (
    <motion.div
      className={`bg-${theme === "dark" ? "gray-800" : "white"} bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-${theme === "dark" ? "gray-700" : "gray-300"} mb-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>Blog List</h2>
        <Link to="/blog/new-blog">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            ADD
          </button>
        </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className={`bg-${theme === "dark" ? "gray-700" : "gray-200"} text-${theme === "dark" ? "white" : "gray-900"} placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className={`absolute left-3 top-2.5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-${theme === "dark" ? "gray-700" : "gray-300"}`}>
          <thead>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                Title
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                Description
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                Blog Type
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                Image
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                Date
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                Posted By
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className={`divide-y divide-${theme === "dark" ? "gray-700" : "gray-300"}`}>
            {filteredProducts.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === "dark" ? "text-gray-100" : "text-gray-900"} flex gap-2 items-center`}>
                  {replaceHtmlTag(truncateText(product.title, 5))}
                </td>

                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {replaceHtmlTag(truncateText(product.description, 5))}
                </td>

                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {product.blogType}
                </td>

                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === "dark" ? "text-gray-100" : "text-gray-900"} flex gap-2 items-center`}>
                  <img src={product.image} alt="image" />
                </td>

                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>

                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {product.postedBy}
                </td>

                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  <button className={`text-${theme === "dark" ? "indigo-400" : "indigo-600"} hover:text-indigo-300 mr-2`}>
                    <Edit size={18} onClick={handleEdit(product._id)} />
                  </button>
                  <button className={`text-${theme === "dark" ? "red-400" : "red-600"} hover:text-red-300`}>
                    <Trash2 size={18} onClick={handleDelete(product._id)} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default BlogTable;
