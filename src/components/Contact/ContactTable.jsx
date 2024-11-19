import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import truncateText from "../../utility/truncateText";
import replaceHtmlTag from "../../utility/replaceHtmlTag";
import { useTheme } from "../../context/ThemeProvider";

const ContactTable = ({ contactData, onDelete }) => {
  const { theme } = useTheme(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(contactData);
  }, [contactData]);

  const handleEdit = (id) => () => {
    navigate(`/contact/${id}`);
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
          Contact List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Title
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Description
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Address
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Phone
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Email
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody
            className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            {filteredProducts.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 items-center ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
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
                  {replaceHtmlTag(truncateText(product.address, 5))}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {product.phone}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {product.email}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Edit size={18} onClick={handleEdit(product._id)} />
                  </button>
                  {/* <button className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} onClick={handleDelete(product._id)} />
                  </button> */}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ContactTable;
