import type { Post } from "./IPost";

export interface PostContextType {
    posts: [] | Post[];
    currentPost:  null | Post;
    loading: boolean;
    getAll: () => Promise<void>;
    get: (id: string) => Promise<void>;
    update: ({id, ...args }: Partial<Post>) => Promise<boolean>;
    create: ({ ...args }: Post) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
}
