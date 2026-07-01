"use client"

import { use } from "react"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ShoppingCart, Star, Heart, ShieldCheck, Truck, RotateCcw } from "lucide-react"
import { useGetProductBySlugQuery } from "@/lib/features/api/ecommerceApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function normalizeImageUrl(image: string) {
    const trimmedImage = image.trim()
    try {
        const parsedImage = JSON.parse(trimmedImage)
        if (Array.isArray(parsedImage) && typeof parsedImage[0] === "string") {
            return parsedImage[0]
        }
        if (typeof parsedImage === "string") {
            return parsedImage
        }
    } catch {
        return trimmedImage
    }
    return trimmedImage
}

function getDisplayImageUrl(image: string) {
    try {
        const imageUrl = new URL(image)
        if (
            imageUrl.protocol === "https:" &&
            imageUrl.hostname === "api.escuelajs.co" &&
            imageUrl.pathname.startsWith("/api/v1/files/")
        ) {
            return `/api/image-proxy?url=${encodeURIComponent(imageUrl.toString())}`
        }
    } catch {
        return image
    }
    return image
}

interface ProductDetailProps {
    params: Promise<{ slug: string }>
}

export default function ProductDetail({ params }: ProductDetailProps) {
    const { slug } = use(params)
    const { data: product, isLoading, isError } = useGetProductBySlugQuery(slug)
    
    const [selectedImageIdx, setSelectedImageIdx] = useState(0)
    const [isWishlisted, setIsWishlisted] = useState(false)

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-16 animate-pulse">
                <div className="mb-8 h-6 w-32 rounded bg-slate-200" />
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="aspect-4/3 w-full rounded-2xl bg-slate-200" />
                        <div className="flex gap-2">
                            <div className="h-20 w-20 rounded-lg bg-slate-200" />
                            <div className="h-20 w-20 rounded-lg bg-slate-200" />
                            <div className="h-20 w-20 rounded-lg bg-slate-200" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-8 w-3/4 rounded bg-slate-200" />
                        <div className="h-6 w-1/4 rounded bg-slate-200" />
                        <div className="h-24 w-full rounded bg-slate-200" />
                        <div className="h-12 w-1/3 rounded bg-slate-200" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError || !product) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-4 rounded-full bg-red-50 p-4 text-red-500">
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
                <p className="mt-2 text-slate-500 max-w-md">We couldn't retrieve the details for this product. It may have been removed or the link might be incorrect.</p>
                <Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-md">
                    <ArrowLeft className="h-4 w-4" /> Back to Products
                </Link>
            </div>
        )
    }
    
    const productImages = (product.images || []).map(normalizeImageUrl).filter(Boolean)
    const displayImages = productImages.map(getDisplayImageUrl)
    const mainImage = displayImages[selectedImageIdx] || ""

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-16">
            <Link href="/products" className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Products
            </Link>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                {/* Left Side: Images Section */}
                <div className="flex flex-col gap-4">
                    <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-md" style={{ aspectRatio: "4/3" }}>
                        {mainImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={mainImage}
                                alt={product.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                                Image unavailable
                            </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                    {displayImages.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                            {displayImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIdx(idx)}
                                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                                        selectedImageIdx === idx 
                                            ? "border-slate-900 ring-2 ring-slate-900/10 scale-95" 
                                            : "border-slate-200 hover:border-slate-400"
                                    }`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img}
                                        alt={`${product.title} view ${idx + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {/* Right Side: Product Details */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100 border-0 text-xs font-semibold px-3 py-1">
                                Premium Quality
                            </Badge>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                                {product.title}
                            </h1>
                        </div>
                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-slate-600">4.8 (124 reviews)</span>
                        </div>
                        {/* Price */}
                        <div className="border-y border-slate-100 py-4">
                            <span className="text-3xl font-black text-slate-900">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>
                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-slate-900">Description</h3>
                            <p className="text-base leading-relaxed text-slate-600">
                                {product.description}
                            </p>
                        </div>
                    </div>
                    {/* Value Props & Actions */}
                    <div className="mt-8 space-y-6">
                        {/* Highlights */}
                        <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-xs font-medium text-slate-600 sm:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4 text-slate-500 shrink-0" />
                                <span>Free shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RotateCcw className="h-4 w-4 text-slate-500 shrink-0" />
                                <span>30-day returns</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-slate-500 shrink-0" />
                                <span>2-year warranty</span>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button className="flex-1 rounded-full py-6 text-base font-semibold shadow-lg hover:scale-[1.01] transition-transform">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                className={`rounded-full p-4 border-slate-200 transition-colors ${
                                    isWishlisted ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100" : "hover:bg-slate-50 text-slate-600"
                                }`}
                                onClick={() => setIsWishlisted(!isWishlisted)}
                            >
                                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}