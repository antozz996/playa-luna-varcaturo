import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const playaLunaPresentationResolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/", type: "homeMedia" },
    { route: "/beach-club", type: "beachMedia" },
    { route: "/beach-club/", type: "beachMedia" },
    { route: "/ristorante-sul-mare", type: "restaurantMedia" },
    { route: "/ristorante-sul-mare/", type: "restaurantMedia" },
    { route: "/piscina", type: "poolMedia" },
    { route: "/piscina/", type: "poolMedia" },
    { route: "/eventi", type: "eventsMedia" },
    { route: "/eventi/", type: "eventsMedia" },
    { route: "/wedding", type: "weddingMedia" },
    { route: "/wedding/", type: "weddingMedia" },
  ]),
  locations: {
    homeMedia: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
    }),
    beachMedia: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Beach Club", href: "/beach-club/" }] }),
    }),
    restaurantMedia: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({
        locations: [{ title: "Ristorante", href: "/ristorante-sul-mare/" }],
      }),
    }),
    poolMedia: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Piscina", href: "/piscina/" }] }),
    }),
    eventsMedia: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Eventi", href: "/eventi/" }] }),
    }),
    weddingMedia: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Wedding", href: "/wedding/" }] }),
    }),
  },
};
