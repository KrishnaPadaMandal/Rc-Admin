import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import truncateText from "../../utility/truncateText";
import replaceHtmlTag from "../../utility/replaceHtmlTag";
import { useTheme } from "../../context/ThemeProvider";

const ServiceTable = ({ serviceData, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const { theme } = useTheme();

  useEffect(() => {
    setFilteredProducts(serviceData);
  }, [serviceData]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = serviceData.filter((service) =>
      service.title.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  const handleEdit = (id) => () => {
    navigate(`/services/${id}`);
  };

  const handleDelete = (id) => () => {
    confirm("Are you sure you want to delete this service?") &&
      onDelete(id, {
        onSuccess: () => {
          const updatedServices = filteredProducts.filter(
            (service) => service._id !== id
          );

          setFilteredProducts(updatedServices);

          toast.success(" Service deleted successfully.");
        },
        onError: () => {
          toast.error("Failed to delete service.");
        },
      });
  };

  return (
    <motion.div
      className={`${
        theme === "dark"
          ? "bg-gray-800 bg-opacity-50 text-gray-100 border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      } backdrop-blur-md shadow-lg rounded-xl p-6 border mb-8`}
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
          Services List
        </h2>
        <Link to="/services/new-service">
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
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900 placeholder-gray-600"
            } rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
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
                Icon
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Image
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Short Description
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Long Description
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
            className={`${
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
                  className={`${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  } px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 items-center`}
                >
                  {product.title}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <img
                    src={product.icon}
                    alt="icon"
                    width="100px"
                    height="100px"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <img
                    src={product.image}
                    alt="image"
                    width="100px"
                    height="100px"
                  />
                </td>
                <td
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } px-6 py-4 whitespace-nowrap text-sm`}
                >
                  {replaceHtmlTag(truncateText(product.shortDescription, 5))}
                </td>
                <td
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } px-6 py-4 whitespace-nowrap text-sm`}
                >
                  {replaceHtmlTag(truncateText(product.longDescription, 5))}
                </td>

                <td
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } px-6 py-4 whitespace-nowrap text-sm`}
                >
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Edit size={18} onClick={handleEdit(product._id)} />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
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

export default ServiceTable;
