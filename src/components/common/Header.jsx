import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";

const Header = ({ title }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`${
        theme === "dark"
          ? "bg-gray-800 bg-opacity-50 border-gray-700 text-gray-100"
          : "bg-gray-100 bg-opacity-70 border-gray-200 text-gray-900"
      } backdrop-blur-md shadow-lg border-b`}
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">𝓟𝓻𝓸𝓰𝓸𝓽𝓲𝓜𝓮𝓼𝓼
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded"
      >
        {theme === "light" ? (
          <Moon className="w-6 h-6 text-cyan-400 " />
        ) : (
          <Sun className="w-6 h-6 text-orange-500" />
        )}
      </button>
    </header>
  );
};

export default Header;
