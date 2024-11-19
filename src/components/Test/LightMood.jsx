import React, { useState, useEffect } from 'react';

function LightMood() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle between light and dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded"
      >
        Toggle Mode
      </button>
      <div className="m-auto text-center">
        <h1 className="text-3xl font-bold">Hello, {isDarkMode ? 'Dark' : 'Light'} Mode!</h1>
        <p>Toggle the mode to switch between light and dark themes.</p>
      </div>
    </div>
  );
}

export default LightMood;
