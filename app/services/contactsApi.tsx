import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddItemModal } from "../models/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://62f899fe3eab3503d1d873c7.mockapi.io/",
  }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getItems: builder.query<AddItemModal[], void>({
      query: () => "/Crud",
      providesTags: ["Item"],
    }),
    item: builder.query<AddItemModal, string>({
      query: (id) => `/Crud/${id}`,
    }),
    addItem: builder.mutation<void, AddItemModal>({
      query: (item) => ({
        url: "/Crud",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation<void, AddItemModal>({
      query: ({ id, ...rest }) => ({
        url: `/Crud/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Crud/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useItemQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = contactsApi;
