import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import truncateText from "../../utility/truncateText";
import replaceHtmlTag from "../../utility/replaceHtmlTag";
import { useTheme } from "../../context/ThemeProvider";

const AboutTable = ({ aboutData, onDelete }) => {
  const { theme } = useTheme(); // Get current theme
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(aboutData);
  }, [aboutData]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = aboutData.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.aboutType.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  const handleEdit = (id) => () => {
    navigate(`/about/${id}`);
  };

  const handleDelete = (id) => () => {
    confirm("Are you sure you want to delete this product?") && onDelete(id);

    const updatedProducts = filteredProducts.filter(
      (product) => product._id !== id
    );

    setFilteredProducts(updatedProducts);

    toast.success(" Product deleted successfully.");
  };

  return (
    <motion.div
      className={`${
        theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border ${
        theme === "dark" ? "border-gray-700" : "border-gray-300"
      } mb-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl font-semibold ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          About List
        </h2>
        <Link to="/about/new-about">
          <button
            className={`${
              theme === "dark" ? "bg-blue-500" : "bg-blue-600"
            } text-white px-4 py-2 rounded-lg`}
          >
            ADD
          </button>
        </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className={`${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
            } placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search
            className={`absolute left-3 top-2.5 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
            size={18}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className={`min-w-full divide-y ${
            theme === "dark" ? "divide-gray-700" : "divide-gray-300"
          }`}
        >
          <thead>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Title
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Description
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                About Type
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-300"}`}>
            {filteredProducts.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  } flex gap-2 items-center`}
                >
                  {product.title}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {replaceHtmlTag(truncateText(product.description, 5))}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {product.aboutType}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <button
                    className={`text-indigo-400 hover:text-indigo-300 mr-2 ${
                      theme === "dark" ? "hover:text-indigo-300" : "hover:text-indigo-500"
                    }`}
                    onClick={handleEdit(product._id)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className={`text-red-400 hover:text-red-300 ${
                      theme === "dark" ? "hover:text-red-300" : "hover:text-red-500"
                    }`}
                    onClick={handleDelete(product._id)}
                  >
                    <Trash2 size={18} />
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

export default AboutTable;
