import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { IUser } from "../../types";
import { setUser } from "../../features/users/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});
