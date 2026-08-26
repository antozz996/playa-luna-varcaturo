import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  schemaType: string,
  title: string,
) =>
  S.listItem()
    .id(schemaType)
    .title(title)
    .child(
      S.document()
        .schemaType(schemaType)
        .documentId(schemaType)
        .title(title),
    );

export const playaLunaStructure: StructureResolver = (S) =>
  S.list()
    .title("Gestione sito")
    .items([
      singleton(S, "homeMedia", "Home"),
      S.divider(),
      singleton(S, "beachMedia", "Beach Club"),
      singleton(S, "beachFoodMedia", "Beach Food · Tavola calda e fredda"),
      singleton(S, "restaurantMedia", "Ristorante"),
      singleton(S, "poolMedia", "Piscina Playa Luna"),
      singleton(S, "eventsMedia", "Eventi"),
      singleton(S, "weddingMedia", "Wedding"),
    ]);
