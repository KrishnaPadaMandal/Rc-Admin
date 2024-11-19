import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllAbout = () => {
  const getAllAbout = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/about`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get about");
    }

    return await response.json();
  };

  const {
    data: allAbout,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["allAbout"],
    queryFn: getAllAbout,
  });

  return { allAbout, isSuccess, isError, refetch };
};

export const useGetAbout = (id) => {
  const getAbout = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/about/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return await response.json();
  };

  const {
    data: about,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["about", id],
    queryFn: getAbout,
  });

  return { about, isSuccess, isError };
};

export const useCreateAbout = () => {
  const createAbout = async (about) => {
    const response = await fetch(`${API_BASE_URL}/admin/about`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(about),
    });

    if (!response.ok) {
      throw new Error("Failed to create about");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: createAbout,
  });
};

export const useUpdateAbout = () => {
  const updateAbout = async (about) => {
    const response = await fetch(`${API_BASE_URL}/admin/about/${about.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(about),
    });

    if (!response.ok) {
      throw new Error("Failed to update about");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateAbout,
  });
};

export const useDeleteAbout = () => {
  const deleteAbout = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/about/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete about");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: deleteAbout,
  });
};
