import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";

export const Project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "dates",
      title: "Dates",
      type: "object",
      fields: [
        defineField({
          name: "start",
          title: "Start",
          type: "date",
          options: {
            dateFormat: "YYYY-MM",
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "end",
          title: "End",
          type: "date",
          options: {
            dateFormat: "YYYY-MM",
          },
          validation: (Rule) => Rule.min(Rule.valueOfField("start")),
        }),
      ],
    }),
    defineField({
      name: "pictures",
      title: "Pictures",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
  ],
});
