import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";

export const MainInfo = defineType({
  name: "main-info",
  title: "Main Info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "highlighted_projects",
      title: "Highlighted Projects",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" } as const] })],
      validation: (Rule) => Rule.unique().length(5),
    }),
  ],
});
