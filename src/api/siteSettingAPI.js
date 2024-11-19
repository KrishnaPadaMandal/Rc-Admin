import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetSiteSetting = () => {
  const getSiteSetting = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/siteSetting`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get site setting");
    }

    return await response.json();
  };

  const {
    data: siteSetting,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["siteSetting"],
    queryFn: getSiteSetting,
  });

  return { siteSetting, isSuccess, isError, refetch };
};

export const useUpdateSiteSetting = () => {
  const updateSiteSetting = async (siteSetting) => {
    const response = await fetch(`${API_BASE_URL}/admin/siteSetting`, {
      method: "PATCH",
      body: siteSetting,
    });

    if (!response.ok) {
      throw new Error("Failed to update site setting");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateSiteSetting,
  });
};
