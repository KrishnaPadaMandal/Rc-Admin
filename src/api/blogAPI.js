import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllBlogs = () => {
  const getAllBlogs = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/blog`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get blogs....");
    }

    return await response.json();
  };

  const {
    data: allBlogs,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: getAllBlogs,
  });

  return { allBlogs, isSuccess, isError, refetch };
};

export const useGetBlog = (id) => {
  const getBlog = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/blog/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get blog");
    }

    return await response.json();
  };

  const {
    data: blog,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: getBlog,
  });

  return { blog, isSuccess, isError };
};

export const useCreateBlog = () => {
  const createBlog = async (blog) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog`, {
      method: "POST",
      body: blog,
    });

    if (!response.ok) {
      throw new Error("Failed to create blog");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: createBlog,
  });
};

export const useUpdateBlog = () => {
  const updateBlog = async (blog) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog`, {
      method: "PATCH",
      body: blog,
    });

    if (!response.ok) {
      throw new Error("Failed to update blog");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateBlog,
  });
};

export const useDeleteBlog = () => {
  const deleteBlog = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: deleteBlog,
  });
};
