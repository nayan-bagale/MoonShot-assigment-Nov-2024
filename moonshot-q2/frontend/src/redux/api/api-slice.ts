import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body: { ...body },
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: `/auth/signup`,
        method: "POST",
        body: { ...body },
      }),
    }),
    logout: builder.mutation({
      query: () => `/auth/logout`,
    }),
    getSession: builder.mutation({
      query: () => `/auth/session`,
    }),
    getDataset: builder.mutation({
      query: ({ feature, ageGroup, gender, dateRange }) => {
        return {
          url: `/data`,
          params: {
            feature,
            ageGroup,
            gender,
            dateRange,
          },
        };
      },
    }),
    getFilters: builder.mutation({
      query: () => '/filters'
    })
  }),
});

export default backendApi;

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetSessionMutation,
  useGetDatasetMutation,
  useGetFiltersMutation,
} = backendApi;
