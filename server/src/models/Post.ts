import axios from 'axios';
import { Post, UpdatePostRequest } from '../types';
let posts: Post[] = [];
const getWebPosts = async () => {

    const webPosts = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
    posts = [...posts, ...webPosts.data];
}
getWebPosts();
// Helper function to generate ID
const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// User operations
const PostModel = {
    async create(postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
        const post: Post = {
            id: generateId(),
            ...postData,
            createdAt: new Date()
        };
        posts.push(post);
        console.log(`Post created: ${post.title}, Total posts: ${posts.length}`);
        return post;
    },

    async get(id: string): Promise<Post | undefined> {
        console.log(`Looking for post with id: ${id}`);
        const post = posts.find(post => post.id === id);
        console.log(`Found post: ${post ? 'Yes' : 'No'}`);
        return post;
    },
    async update(postData: UpdatePostRequest): Promise<Post | undefined> {
        console.log(`Looking for post with id: ${postData.id}`);
        const index = posts.findIndex(post => post.id === postData.id);

        if (index !== -1) {
            posts[index] = { ...posts[index], ...postData };
            return posts[index];
        }

        return undefined;
    },

    // Helper functions for development/debugging
    getAllPosts(): Post[] {
        return posts;
    },

    clearPosts(): void {
        posts = [];
        console.log('All posts cleared');
    },

    deletePost(id: string): boolean {
        const initialLength = posts.length;
        posts = posts.filter(post => post.id !== id);
        const deleted = posts.length < initialLength;

        if (deleted) {
            console.log(`Post deleted: ${id}, Total posts: ${posts.length}`);
        } else {
            console.log(`Post not found for deletion: ${id}`);
        }

        return deleted;
    }
};

export default PostModel; 