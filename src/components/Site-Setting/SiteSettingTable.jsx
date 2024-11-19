import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a ThemeProvider

const SiteSettingTable = ({ siteSettingtData }) => {
  const { theme } = useTheme();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(siteSettingtData);
  }, [siteSettingtData]);

  const handleEdit = (id) => () => {
    navigate(`/site-setting/${id}`);
  };

  return (
    <motion.div
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
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl font-semibold ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Site Setting
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
                Logo
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Support Contact
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Support Email
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Whatsapp Number
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                FB Link
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Insta Link
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Twitter Link
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Youtube Link
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Linkedin Link
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Registration Fees
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
              theme === "dark" ? "divide-gray-700" : "divide-gray-300"
            }`}
          >
            {filteredProducts.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={theme === "dark" ? "text-gray-100" : "text-gray-900"}
              >
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  } flex gap-2 items-center`}
                >
                  <img src={product.logo} alt="logo" />
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.supportContact}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.supportEmail}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.whatsappNumber}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.fbLink}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.instaLink}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.twitterLink}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.youtubeLink}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.linkedinLink}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {product.registrationFees}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Edit size={18} onClick={handleEdit(product._id)} />
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

export default SiteSettingTable;
