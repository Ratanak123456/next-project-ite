import { Product } from "@/lib/types/ProductType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
    reducerPath: "ecommerceApi",
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_URL}),
    endpoints: builder => ({
        //Get All Product
        getProducts: builder.query<Product[], void>({
            query: ()=> "/api/v1/products",
        }),
        //Get Single Product
        getProductBySlug: builder.query<Product, string>({
            query: (slug) => `/api/v1/products/slug/${slug}`,
        })
    })
})

export const { useGetProductsQuery , useGetProductBySlugQuery } = ecommerceApi