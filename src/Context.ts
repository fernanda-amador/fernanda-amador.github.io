import { createContext } from "react";
import { SanitySchema } from "../sanity.config";

export const Context = createContext<SanitySchema['main-info'] | undefined>(undefined);
