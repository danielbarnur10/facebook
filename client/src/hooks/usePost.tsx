
import { PostContext } from "@/context/PostContext";
import { useContext } from "react";

export const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePost must be used within an PostProvider");
    }
    return context;
};