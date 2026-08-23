import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { playaLunaStructure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "00000000";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "playa-luna-manager",
  title: "Playa Luna Manager",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure: playaLunaStructure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
