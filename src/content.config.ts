import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    created: z.date(),
    modified: z.date().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    created: z.date(),
    modified: z.date().optional(),
    prev: z.string().optional(),
    next: z.string().optional(),
  }),
});

const entranceExam = defineCollection({
  loader: glob({ base: "./src/content/entrance-exam/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    created: z.date(),
    modified: z.date().optional(),
    prev: z.string().optional(),
    next: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  "blog": blog,
  "pages": pages,
  "entrance-exam": entranceExam
};
