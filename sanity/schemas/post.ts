import { defineField, defineType } from "sanity"

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Imagem Principal",
      type: "image",
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
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "blockContent",
    }),
    defineField({
      name: "pdfAttachments",
      title: "Anexos PDF",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Título do PDF",
            },
            {
              name: "file",
              type: "file",
              title: "Arquivo PDF",
              options: {
                accept: ".pdf",
              },
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `por ${author}` }
    },
  },
})

