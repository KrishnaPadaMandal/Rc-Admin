import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllUser = () => {
  const getAllUser = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/user`, {
      method: "GET",
    }); 

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return await response.json();
  };

  const {
    data: allUser,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: getAllUser,
  });

  return { allUser, isSuccess, isError, refetch };
};

export const useGetUser = (id) => {
  const getUser = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/user/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return await response.json();
  };

  const {
    data: user,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: getUser,
  });

  return { user, isSuccess, isError };
};

export const useCreateUser = () => {
  const createUser = async (user) => {
    const response = await fetch(`${API_BASE_URL}/admin/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: createUser,
  });
};

export const useUpdateUser = () => {
  const updateUser = async (user) => {
    const response = await fetch(`${API_BASE_URL}/admin/user/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateUser,
  });
};

export const useDeleteUser = () => {
  const deleteUser = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/user/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: deleteUser,
  });
};
