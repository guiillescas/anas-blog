import { defineField, defineType } from "sanity"

export const aboutSite = defineType({
  name: "aboutSite",
  title: "Sobre o Site",
  type: "document",
  // Nota: Este é um documento singleton - deve existir apenas um documento deste tipo
  fields: [
    defineField({
      name: "title",
      title: "Título Principal",
      type: "string",
      description: "Título que aparece no topo da página",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Imagem Principal",
      type: "image",
      description: "Imagem principal da página",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Conteúdo",
      type: "blockContent",
      description: "Conteúdo principal da página sobre o site",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Seções Adicionais",
      type: "array",
      description: "Seções opcionais para organizar o conteúdo",
      of: [
        {
          type: "object",
          name: "section",
          title: "Seção",
          fields: [
            {
              name: "title",
              title: "Título da Seção",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Conteúdo",
              type: "blockContent",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Imagem",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
})

