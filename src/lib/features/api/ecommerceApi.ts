import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ecommerceApi = createApi({
    reducerPath: "ecommerceApi",
    baseQuery: fetchBaseQuery
})