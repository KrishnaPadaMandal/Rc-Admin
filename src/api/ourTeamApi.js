import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllOurTeam = () => {
  const getAllOurTeam = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/our-team`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get our team....");
    }

    return await response.json();
  };

  const {
    data: allOurTeam,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["allOurTeam"],
    queryFn: getAllOurTeam,
  });

  return { allOurTeam, isSuccess, isError, refetch };
};

export const useGetOurTeam = (id) => {
  const getOurTeam = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/our-team/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get our team");
    }

    return await response.json();
  };

  const {
    data: ourTeam,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["ourTeam", id],
    queryFn: getOurTeam,
  });

  return { ourTeam, isSuccess, isError };
};

export const useCreateOurTeam = () => {
  const createOurTeam = async (ourTeam) => {
    const response = await fetch(`${API_BASE_URL}/admin/our-team`, {
      method: "POST",
      body: ourTeam,
    });

    if (!response.ok) {
      throw new Error("Failed to create our team");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: createOurTeam,
  });
};

export const useUpdateOurTeam = () => {
  const updateOurTeam = async (ourTeam) => {
    const response = await fetch(`${API_BASE_URL}/admin/our-team`, {
      method: "PATCH",
      body: ourTeam,
    });

    if (!response.ok) {
      throw new Error("Failed to update our team");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateOurTeam,
  });
};

export const useDeleteOurTeam = () => {
  const deleteOurTeam = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/our-team/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete our team");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: deleteOurTeam,
  });
};
