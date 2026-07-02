import { ecommerceApi } from '../api';
import { Category } from './../../types/CategoryResponse';

export const CategoryApi = ecommerceApi.injectEndpoints({
    endpoints: builder => ({
        //Get All Product
        getCategories: builder.query<Category[], void>({
            query: ()=> "/api/v1/categories",
        }),
        //Get Single Product
        getCategoryBySlug: builder.query<Category, string>({
            query: (slug) => `/api/v1/categories/${slug}`,
        })
    })
})

export const { useGetCategoriesQuery , useGetCategoryBySlugQuery } = CategoryApi