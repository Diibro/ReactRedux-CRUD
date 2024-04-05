import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: number;
  title: string;
  content: string;
}

export const postsApi = createApi({
     reducerPath: 'postsApi',
     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
     endpoints: (builder) => ({
     getPosts: builder.query<Post[], void>({
          query: () => 'posts',
     }),
     addPost: builder.mutation<Post, Partial<Post>>({
          query: (newPost) => ({
          url: 'posts',
          method: 'POST',
          body: newPost,
          }),
     }),
     updatePost: builder.mutation<Post, Partial<Post> & { id: number }>({
          query: ({ id, ...patch }) => ({
          url: `posts/${id}`,
          method: 'PATCH',
          body: patch,
          }),
     }),
     deletePost: builder.mutation<void, number>({
          query: (id) => ({
          url: `posts/${id}`,
          method: 'DELETE',
          }),
     }),
     }),
});

export const { useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation} = postsApi;
