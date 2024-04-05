import React, { useState } from 'react';
import { useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } from './features/postsSlide';
import { Post } from './features/postsSlide';

const App: React.FC = () => {
  const { data: posts = [], isFetching } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleAddPost = async () => {
    await addPost(newPost).unwrap();
    setNewPost({ title: '', content: '' });
  };

  const handleUpdatePost = async (id: number, updatedPost: Partial<Post>) => {
    await updatePost({ id, ...updatedPost }).unwrap();
  };

  const handleDeletePost = async (id: number) => {
    await deletePost(id).unwrap();
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              <button onClick={() => handleUpdatePost(post.id, { title: 'Updated Title', content: 'Updated Content' })}>
                Update
              </button>
            </li>
          ))
        )}
      </ul>
      <h2>Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
}

export default App;

