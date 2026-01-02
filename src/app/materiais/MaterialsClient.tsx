"use client"

import { useState, useEffect } from "react"

interface Material {
  _id: string
  title: string
  date: string
  description?: string
  coverImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  pdf: {
    asset: {
      url: string
      originalFilename: string
      size: number
    }
    title?: string
  }
}

interface GroupedMaterials {
  [key: string]: Material[]
}

interface MaterialsClientProps {
  initialMaterials: Material[]
}

export default function MaterialsClient({
  initialMaterials,
}: MaterialsClientProps) {
  const [materials] = useState<Material[]>(initialMaterials)
  const [groupedMaterials, setGroupedMaterials] = useState<GroupedMaterials>({})
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [availableYears, setAvailableYears] = useState<number[]>([])

  useEffect(() => {
    // Extrair anos únicos
    const years = new Set<number>()
    materials.forEach((material) => {
      if (material.date) {
        const year = new Date(material.date).getFullYear()
        years.add(year)
      }
    })
    setAvailableYears(Array.from(years).sort((a, b) => b - a))
  }, [materials])

  useEffect(() => {
    if (!materials.length) return

    let filtered = materials

    // Filtrar por ano
    if (selectedYear) {
      filtered = filtered.filter((material) => {
        if (!material.date) return false
        const year = new Date(material.date).getFullYear()
        return year === selectedYear
      })
    }

    // Filtrar por mês (se ano também estiver selecionado)
    if (selectedYear && selectedMonth) {
      filtered = filtered.filter((material) => {
        if (!material.date) return false
        const date = new Date(material.date)
        return (
          date.getFullYear() === selectedYear &&
          date.getMonth() + 1 === selectedMonth
        )
      })
    }

    // Agrupar por data
    const grouped: GroupedMaterials = {}
    filtered.forEach((material) => {
      if (!material.date) return
      const date = new Date(material.date)
      const year = date.getFullYear()
      const month = date.toLocaleDateString("pt-BR", { month: "long" })
      const key = `${month} ${year}`

      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(material)
    })

    // Ordenar as chaves (mais recente primeiro)
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      const dateA = new Date(grouped[a][0].date).getTime()
      const dateB = new Date(grouped[b][0].date).getTime()
      return dateB - dateA
    })

    const sortedGrouped: GroupedMaterials = {}
    sortedKeys.forEach((key) => {
      sortedGrouped[key] = grouped[key]
    })

    setGroupedMaterials(sortedGrouped)
  }, [materials, selectedYear, selectedMonth])

  const clearFilters = () => {
    setSelectedYear(null)
    setSelectedMonth(null)
  }

  const getMonthsInYear = (year: number): number[] => {
    const months = new Set<number>()
    materials.forEach((material) => {
      if (!material.date) return
      const date = new Date(material.date)
      if (date.getFullYear() === year) {
        months.add(date.getMonth() + 1)
      }
    })
    return Array.from(months).sort((a, b) => b - a)
  }

  if (!materials.length) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12">
            <h1 className="font-gastela text-4xl font-bold tracking-tight text-neutral-900 mb-4">
              Meus materiais
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl">
              Relatórios mensais com informações, fotos e relatos das viagens e
              atividades missionárias
            </p>
          </div>
          <div className="text-center py-16">
            <p className="text-neutral-600">
              Nenhum material disponível no momento.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <h1 className="font-gastela text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            Meus materiais
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl">
            Relatórios mensais com informações, fotos e relatos das viagens e
            atividades missionárias
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-12 flex flex-wrap items-center gap-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
          <span className="text-sm font-medium text-neutral-700">Filtrar por:</span>

          <select
            value={selectedYear || ""}
            onChange={(e) => {
              setSelectedYear(e.target.value ? Number(e.target.value) : null)
              setSelectedMonth(null)
            }}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="">Todos os anos</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {selectedYear && (
            <select
              value={selectedMonth || ""}
              onChange={(e) =>
                setSelectedMonth(e.target.value ? Number(e.target.value) : null)
              }
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="">Todos os meses</option>
              {getMonthsInYear(selectedYear).map((month) => (
                <option key={month} value={month}>
                  {new Date(selectedYear, month - 1).toLocaleDateString("pt-BR", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          )}

          {(selectedYear || selectedMonth) && (
            <button
              onClick={clearFilters}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Listagem agrupada */}
        {Object.keys(groupedMaterials).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-600">
              {selectedYear || selectedMonth
                ? "Nenhum material encontrado com os filtros selecionados."
                : "Nenhum material disponível no momento."}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedMaterials).map(([groupKey, groupMaterials]) => (
              <section key={groupKey}>
                <h2 className="font-gastela text-3xl font-semibold text-neutral-900 mb-6 capitalize">
                  {groupKey}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {groupMaterials.map((material) => (
                    <a
                      key={material._id}
                      href={material.pdf.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {material.coverImage?.asset?.url && (
                        <div className="w-full h-48 overflow-hidden bg-neutral-100">
                          <img
                            src={material.coverImage.asset.url}
                            alt={material.coverImage.alt || material.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors mb-2">
                          {material.title}
                        </h3>
                        {material.description && (
                          <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                            {material.description}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <svg
                              className="w-5 h-5 text-neutral-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <span>
                              {(material.pdf.asset.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <svg
                            className="w-5 h-5 text-primary-700 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

