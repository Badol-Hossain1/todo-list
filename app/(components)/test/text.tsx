import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://62f899fe3eab3503d1d873c7.mockapi.io",
  }),
  endpoints: (builder) => ({
    getTodo: builder.query({
      query: () => {
        return {
          url: "/crud",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTodoQuery } = todoApi;
