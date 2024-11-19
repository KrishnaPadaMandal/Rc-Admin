import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeProvider";

const UsersTable = ({ userData, onDelete }) => {
  const { theme } = useTheme(); // Get current theme (light or dark)
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userData);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredUsers(userData);
  }, [userData]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = userData.filter((user) =>
      user.full_name.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (id) => () => {
    navigate(`/users/${id}`);
  };

  const handleDelete = (id) => () => {
    confirm("Are you sure you want to delete this user?") && onDelete(id);

    const updatedUsers = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(updatedUsers);

    toast.success("User deleted successfully.");
  };

  return (
    <motion.div
      className={`${
        theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Users</h2>
        <Link to="/users/new-user">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            ADD
          </button>
        </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className={`${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
            } placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className={`min-w-full divide-y ${
            theme === "dark" ? "divide-gray-700" : "divide-gray-200"
          }`}
        >
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Father/Husband Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
            {filteredUsers.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{user.full_name}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{user.fatherOrHusbandName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.phone_number}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Edit size={18} onClick={handleEdit(user._id)} />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} onClick={handleDelete(user._id)} />
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

export default UsersTable;
