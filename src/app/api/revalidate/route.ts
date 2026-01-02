import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const documentType = body._type || body.type

    if (documentType === "post") {
      revalidateTag("posts", "max")
      revalidatePath("/blog")
      revalidatePath("/")
      
      const slug = body.slug?.current || body.slug
      if (slug) {
        revalidatePath(`/blog/${slug}`)
      }

      return NextResponse.json({ 
        revalidated: true, 
        message: "Cache revalidado com sucesso",
        paths: ["/blog", "/", slug ? `/blog/${slug}` : null].filter(Boolean),
        tags: ["posts"]
      })
    }

    if (documentType === "about") {
      revalidateTag("about", "max")
      revalidatePath("/sobre-mim")

      return NextResponse.json({ 
        revalidated: true, 
        message: "Cache revalidado com sucesso",
        paths: ["/sobre-mim"],
        tags: ["about"]
      })
    }

    if (documentType === "aboutSite") {
      revalidateTag("aboutSite", "max")
      revalidatePath("/sobre-o-site")

      return NextResponse.json({ 
        revalidated: true, 
        message: "Cache revalidado com sucesso",
        paths: ["/sobre-o-site"],
        tags: ["aboutSite"]
      })
    }

    if (documentType === "material") {
      revalidateTag("materials", "max")
      revalidatePath("/materiais")

      return NextResponse.json({ 
        revalidated: true, 
        message: "Cache revalidado com sucesso",
        paths: ["/materiais"],
        tags: ["materials"]
      })
    }

    return NextResponse.json({ 
      message: "Tipo de documento não requer revalidação",
      receivedType: documentType 
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao processar webhook", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    )
  }
}

