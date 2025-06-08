import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

function createCollection(directory: string) {
  return defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({
      base: `./src/content/${directory}`,
      pattern: "**/*.{md,mdx}",
    }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: image().optional(),
      }),
  });
}

const blog = createCollection("blog");

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/projects/` directory.
  loader: glob({
    base: `./src/content/projects`,
    pattern: "**/*.{md,mdx}",
  }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroImage: z.string().optional(),
      projectUrl: z.string().optional(),
    }),
});

const labs = defineCollection({
  // Load Markdown and MDX files in the `src/content/labs/` directory.
  loader: glob({
    base: `./src/content/labs`,
    pattern: "**/*.{md,mdx}",
  }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroImage: z.string().optional(),
      projectUrl: z.string().optional(),
    }),
});

export const collections = { blog, projects, labs };
