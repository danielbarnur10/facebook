import { useEffect, useState } from "react";
import { usePost } from "@/hooks/usePost";
import type { Post } from "@/types/IPost";

export function PostsPage() {
  const { posts } = usePost();
 
  console.log(posts);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 My Posts</h1>
      <ul className="space-y-2">
        {posts && posts?.map((post, i) => (
          <li key={i} className="p-3 bg-gray-100 rounded shadow-sm">
            <strong>{post.title}</strong> — <em>{post.body}</em>
          </li>
        ))}
      </ul>

    </div>
  );
}