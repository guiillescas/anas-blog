import { defineField, defineType } from "sanity"

export const material = defineType({
  name: "material",
  title: "Material",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      description: "Título do material (ex: Relatório Janeiro 2025)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
      description: "Data do material (usado para agrupar e filtrar)",
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: "DD-MM-YYYY",
      },
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      description: "Descrição breve do conteúdo do material",
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de Capa",
      type: "image",
      description: "Imagem de capa do material (opcional)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
        },
      ],
    }),
    defineField({
      name: "pdf",
      title: "Arquivo PDF",
      type: "file",
      description: "Arquivo PDF do material",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "title",
          type: "string",
          title: "Título do Arquivo",
          description: "Título que aparece no link de download",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "coverImage",
    },
    prepare({ title, date }) {
      const dateObj = date ? new Date(date) : null
      const formattedDate = dateObj
        ? dateObj.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })
        : ""
      return {
        title: title || "Sem título",
        subtitle: formattedDate,
      }
    },
  },
  orderings: [
    {
      title: "Data, mais recente primeiro",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Data, mais antigo primeiro",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
})

