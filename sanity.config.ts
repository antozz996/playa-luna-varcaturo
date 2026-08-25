import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { playaLunaStructure } from "./sanity/structure";
import { playaLunaPresentationResolve } from "./sanity/presentation";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "00000000";

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "playa-luna-manager",
  title: "Playa Luna Manager",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: playaLunaStructure,
    }),

    presentationTool({
      previewUrl: {
        origin: "https://playa-luna-varcaturo-delta.vercel.app",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: playaLunaPresentationResolve,
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
