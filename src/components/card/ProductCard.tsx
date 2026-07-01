"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Product } from "@/lib/types/ProductType"
import { useState } from "react"

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

export function ProductCard({
    id,
    title,
    price,
    description,
    images,
}: Product) {
    const [currentImage, setCurrentImage] = useState(0)
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
    const productImages = images.map(normalizeImageUrl).filter(Boolean)
    const activeImageIndex = productImages[currentImage] ? currentImage : 0
    const activeImage = productImages[activeImageIndex]
    const displayImage = activeImage ? getDisplayImageUrl(activeImage) : ""
    const canShowActiveImage = activeImage && !failedImages.has(activeImage)

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % productImages.length)
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)
    }

    return (
        <Card className="group relative mx-auto w-full max-w-sm overflow-hidden border-0 pt-0 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: "4 / 3" }}>
                {canShowActiveImage ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                        src={displayImage}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => {
                            setFailedImages((previousFailedImages) => {
                                const nextFailedImages = new Set(previousFailedImages)
                                nextFailedImages.add(activeImage)
                                return nextFailedImages
                            })
                        }}
                        />
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    Image unavailable
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <CardAction className="absolute right-3 top-3 z-10">
                <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm hover:bg-white">
                    ${price.toFixed(2)}
                </Badge>
                </CardAction>
                {productImages.length > 1 && (
                <>
                    <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white group-hover:opacity-100"
                    >
                    <svg className="h-4 w-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    </button>
                    <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white group-hover:opacity-100"
                    >
                    <svg className="h-4 w-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {productImages.map((_, idx) => (
                        <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === activeImageIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                        }`}
                        />
                    ))}
                    </div>
                </>
                )}
            </div>
            <CardHeader className="space-y-2 pb-2">
                <CardTitle className="text-lg font-bold text-slate-900 line-clamp-1">
                {title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-slate-500 line-clamp-2">
                {description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between pt-0">
                <span className="text-xs font-medium text-slate-400">
                SKU: {id}
                </span>
                <Button className="rounded-full px-6">
                View Details
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                </Button>
            </CardFooter>
        </Card>
    )
}
