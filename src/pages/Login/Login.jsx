// ./pages/Login.js
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../api/authAPI";

const Login = () => {
  const { setAuthUser } = useAuth();

  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      const response = await loginMutation.mutateAsync({ email, password });
      try {
        if (response.code === 200) {
          toast.success(response.message || "Login successful");
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          setAuthUser(response.data);
          navigate("/");
        } else {
          toast.error(response.message || "Login failed");
        }
      } catch (error) {
        console.error(error);
        toast.error(response.message || "An error occurred while logging in");
      }
    },
    [email, password, navigate]
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded shadow-md"
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 pr-10"
          />
          <div
            className="absolute right-3 cursor-pointer flex items-center"
            onClick={togglePasswordVisibility}
            style={{ bottom: "10px" }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
