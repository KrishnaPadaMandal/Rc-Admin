import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetContact = () => {
  const getContact = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/contactUs`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get contact");
    }

    return await response.json();
  };

  const {
    data: contact,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["contact"],
    queryFn: getContact,
  });

  return { contact, isSuccess, isError, refetch };
};

export const useCreateContact = () => {
  const createContact = async (contact) => {
    const response = await fetch(`${API_BASE_URL}/admin/contactUs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Failed to create contact");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: createContact,
  });
};

export const useUpdateContact = () => {
  const updateContact = async (contact) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/contactUs/${contact.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update contact");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateContact,
  });
};

export const useDeleteContact = () => {
  const deleteContact = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/contactUs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: deleteContact,
  });
};
