export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt?: Date;
  userId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  userId: string;
  id: string;
  body: string;
  title: string;
}

export interface DeletePostRequest {
  userId: string;
  id: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface CreatePostRequest {
  title: string;
  author: string;
  body: string;
  userId: string;
}
export interface GetPostRequest {
  title?: string;
  userId?: string;
  id: string;
}
export interface UpdatePostRequest {
  title?: string;
  id: string;
  userId: string;
  author?: string;
  body?: string;
} 