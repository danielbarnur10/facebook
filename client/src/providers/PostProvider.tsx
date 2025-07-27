import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { PostContext } from "@/context/PostContext";
import { API } from "@/constants.tsx/Api.const";
import { removeToken, saveToken } from "@/cookie/cookie";
import type { Post } from "@/types/IPost";


// Configure axios defaults
axios.defaults.withCredentials = true;

interface PostProviderProps {
    children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<[] | Post[]>([]);
    const [currentPost, setCurrentPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true);
    const get = async (id: string) => {
        try {
            const response = await axios.get(`${API.API_BASE_URL}/auth/posts/${id}`);
            setCurrentPost(response.data.post);
        } catch (error) {
            console.error("Get Post check failed:", error);
            setCurrentPost(null);
        } finally {
            setLoading(false);
        }
    };

    const getAll = async (): Promise<void> => {
        try {
            const response = await axios.get(`${API.API_BASE_URL}/auth/posts`);
            setPosts(response.data.posts);
        } catch (error) {
            console.error("Get all Posts error:", error);
        }
    };

    const update = async ({ id, ...args }: Partial<Post>): Promise<boolean> => {
        try {
            const response = await axios.post(`${API.API_BASE_URL}/auth/posts`, {
                id,
                ...args
            });

            setCurrentPost(response.data.post);
            saveToken(response.data.token);
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            return false;
        }
    };

    const create = async ({ ...postaData }: Post) => {
        try {
            await axios.post(`${API.API_BASE_URL}/auth/posts`, {
                ...postaData
            });
            setCurrentPost(null);
            removeToken();


        } catch (error) {
            console.error("Create Post error:", error);
        }
    };
    const deletePost = async (id: string) => {
        try {
            await axios.delete(`${API.API_BASE_URL}/auth/posts/${id}`);
            setCurrentPost(null);
        } catch (error) {
            console.error("Create Post error:", error);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    const value = {
        posts,
        currentPost,
        loading,
        getAll,
        get,
        update,
        create,
        deletePost,
    };

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
