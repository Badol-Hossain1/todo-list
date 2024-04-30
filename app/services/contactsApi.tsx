import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Items } from "../models/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://62f899fe3eab3503d1d873c7.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getItems: builder.query<Items[], void>({
      query: () => "/Crud",
    }),
  }),
});

export const { useGetItemsQuery } = contactsApi;
