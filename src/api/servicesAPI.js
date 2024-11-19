import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllServices = () => {
  const getAllServices = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/service`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get services");
    }

    return await response.json();
  };

  const {
    data: allServices,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["allServices"],
    queryFn: getAllServices,
  });

  return { allServices, isSuccess, isError, refetch };
};

export const useGetService = (id) => {
  const getService = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/service/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get service");
    }

    return await response.json();
  };

  const {
    data: service,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: getService,
  });

  return { service, isSuccess, isError };
};

export const useCreateService = () => {
  const createService = async (service) => {
    const response = await fetch(`${API_BASE_URL}/admin/service`, {
      method: "POST",
      body: service,
    });

    if (!response.ok) {
      throw new Error("Failed to create service");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: createService,
  });
};

export const useUpdateService = () => {
  const updateService = async (service) => {
    const response = await fetch(`${API_BASE_URL}/admin/service`, {
      method: "PATCH",
      body: service,
    });

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateService,
  });
};

export const useDeleteService = () => {
  const deleteService = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/service/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete service");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: deleteService,
  });
};
