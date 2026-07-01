"use client"

import { ProductCard } from "@/components/card/ProductCard";
import { useGetProductsQuery } from "@/lib/features/api/ecommerceApi"

export default function ProductPage() {
    const { data: products = [], isError, isLoading } = useGetProductsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading products</div>;
    console.log(products);
    

    return (
        <div className="grid gap-6 gap-x-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center w-70%">
        {products.map((product) => (
            <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            images={product.images}
            price={product.price}
            slug={product.slug}
            />
        ))}
        </div>
    );
}