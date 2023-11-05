import { createClient } from "@sanity/client";

export const sanityClient =  createClient({
  projectId: "nh946dkw",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
});
