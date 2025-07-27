import { Request, Response } from 'express';
import { CreatePostRequest, GetPostRequest, UpdatePostRequest } from '../types';
import PostModel from '../models/Post';

const PostsController = {

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { ...args }: CreatePostRequest = req.body;

      const post = await PostModel.create(args);
      if (!post) {
        res.status(400).json({ message: 'Failed to post' });
        return;
      }

      res.status(201).json({
        message: 'post successfuly created',
        post: {
          id: post.id,
          userId: post.userId,
          body: post.body,
          title: post.title,
          createdAt: post.createdAt
        }
      });
    } catch (error) {
      console.error('Post error:', error);
      res.status(500).json({ message: 'Server error during post creation' });
    }
  },

  async get(req: Request, res: Response): Promise<void> {
    try {
      const request:GetPostRequest = req.body;
      const post = await PostModel.get(request.id);
      if (!post) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({
        post: {
          id: post.id,
          body: post.body,
          title: post.title,
          createdAt: post.createdAt
        }
      });
    } catch (error) {
      console.error('GetMe error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const request :UpdatePostRequest= req.body;
      const post = await PostModel.update(request)
      if (post === undefined) res.status(404).json({ message: "error accurd while updating" })
      res.status(201).send(post);
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Server error during logout' });
    }
  },

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const posts = PostModel.getAllPosts();

      res.json({
        message: `Found ${posts.length} posts`,
        posts: posts,
        total: posts.length
      });
    } catch (error) {
      console.error('Get all posts error:', error);
      res.status(500).json({ message: 'Server error while fetching posts' });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await PostModel.deletePost(id);
      if (deleted) {
        res.json({
          message: 'Post deleted successfully',
        });

      } else {
        console.log(`❌ Failed to delete Post ${id}`);
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      console.error('Delete post error:', error);
      res.status(500).json({ message: 'Server error while deleting user' });
    }
  }
};

export default PostsController;