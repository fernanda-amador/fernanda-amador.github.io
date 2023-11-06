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
    defineField({
      name: "about",
      title: "About",
      type: "text",
    }),
    defineField({
      name: "proyect_date_present",
      title: "Proyect Date Present Display",
      type: "string",
      description: "text to be displayed when the project is still in progress (e.g. 'present' will display 'Feb 2019 - present')",
      initialValue: "actualidad",
    }),
    defineField({
      name: "lang",
      title: "Language",
      type: "string",
      initialValue: "es",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Spanish", value: "es" },
        ],
      },
    }),
  ],
});
