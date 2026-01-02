import { getMaterials } from "@/lib/sanity-utils"
import MaterialsClient from "./MaterialsClient"

export const metadata = {
  title: "Meus materiais - Blog da Ana",
  description: "Materiais e recursos disponíveis",
}

export default async function MateriaisPage() {
  const materials = await getMaterials()

  return <MaterialsClient initialMaterials={materials || []} />
}
