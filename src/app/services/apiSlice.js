import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure correct import
import CookieService from "../../services/CookieService";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: (builder) => ({
    // Get
    getDashboardProducts: builder.query({
      //pagination[${page}]=1&pagination[pageSize]=7
      query: ({ page }) => `api/products/?populate=thumbnail,category`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    // Delete
    deleteDashboardProducts: builder.mutation({
      query: (id) => ({
        url: `api/products/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    // Update
    updateDashboardProducts: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getDashboardProducts", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    // Add
    addDashboardProducts: builder.mutation({
      query: (body) => ({
        url: `api/products`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
  useAddDashboardProductsMutation, // Add this hook for the Add mutation
} = apiSlice;
