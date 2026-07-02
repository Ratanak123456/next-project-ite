import { ecommerceApi } from "@/lib/redux/api";
import { Product } from "@/lib/types/ProductType";

export const ProductApi = ecommerceApi.injectEndpoints({
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

export const { useGetProductsQuery , useGetProductBySlugQuery } = ProductApi