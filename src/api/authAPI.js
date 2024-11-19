import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogin = () => {
  const login = async (user) => {
    const response = await fetch(`${API_BASE_URL}/admin/adminAuth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  };

  return useMutation({
    mutationFn: login,
  });
};
