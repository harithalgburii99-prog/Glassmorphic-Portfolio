import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const authService = {
  login: async (credentials: Record<string, string>) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },
  getAdminPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts/admin');
    return response.data;
  },
  getPost: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  createPost: async (postData: Partial<Post>): Promise<Post> => {
    const response = await api.post('/posts', postData);
    return response.data;
  },
  updatePost: async (id: string, postData: Partial<Post>): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },
  deletePost: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};

export default api;
