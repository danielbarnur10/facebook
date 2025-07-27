import type { PostContextType } from "@/types/IPostContext";
import { createContext } from "react";

export const PostContext = createContext<PostContextType | undefined>(undefined);