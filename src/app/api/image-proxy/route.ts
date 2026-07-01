const ALLOWED_HOSTNAME = "api.escuelajs.co"
const ALLOWED_PATH_PREFIX = "/api/v1/files/"

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const imageUrl = requestUrl.searchParams.get("url")

    if (!imageUrl) {
        return new Response("Missing image url", { status: 400 })
    }

    let parsedImageUrl: URL

    try {
        parsedImageUrl = new URL(imageUrl)
    } catch {
        return new Response("Invalid image url", { status: 400 })
    }

    if (
        parsedImageUrl.protocol !== "https:" ||
        parsedImageUrl.hostname !== ALLOWED_HOSTNAME ||
        !parsedImageUrl.pathname.startsWith(ALLOWED_PATH_PREFIX)
    ) {
        return new Response("Image host is not allowed", { status: 400 })
    }

    const imageResponse = await fetch(parsedImageUrl, {
        cache: "force-cache",
    })

    if (!imageResponse.ok) {
        return new Response("Image could not be loaded", {
            status: imageResponse.status,
        })
    }

    const contentType = imageResponse.headers.get("content-type") ?? ""

    if (!contentType.startsWith("image/")) {
        return new Response("URL did not return an image", { status: 415 })
    }

    return new Response(imageResponse.body, {
        headers: {
            "Cache-Control": "public, max-age=86400",
            "Content-Type": contentType,
        },
    })
}
