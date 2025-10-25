import { defineType, defineArrayMember } from "sanity"

export const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Título H1", value: "h1" },
        { title: "Título H2", value: "h2" },
        { title: "Título H3", value: "h3" },
        { title: "Título H4", value: "h4" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Lista com marcadores", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
          { title: "Sublinhado", value: "underline" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
        },
      ],
    }),
  ],
})

