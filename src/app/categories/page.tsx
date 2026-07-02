"use client"
import { useGetCategoriesQuery } from "@/lib/redux/service/categoryApi"

export default function Category (){
    const {data , isLoading } = useGetCategoriesQuery();
    if (isLoading) return <h1>Loading</h1>
    return (
        <main>
            {
                data?.map((categories)=>(
                    <main key={categories.id}>
                        <div>{categories.name}</div>
                        <img src={categories?.image} alt={`${categories.slug}`}/>
                    </main>
                ))
            }
        </main>
    )
}