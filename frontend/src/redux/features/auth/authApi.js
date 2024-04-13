import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: 'user/register',
        method: 'POST',
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
