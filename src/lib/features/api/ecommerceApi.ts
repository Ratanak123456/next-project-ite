import { Product } from "@/lib/types/ProductType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
    reducerPath: "ecommerceApi",
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_URL}),
    endpoints: builder => ({
        getProducts: builder.query<Product[], void>({
            query: ()=> "/api/v1/products",
        })
        // getProductById: builder.query<Product, >
    })
})

export const { useGetProductsQuery } = ecommerceApi