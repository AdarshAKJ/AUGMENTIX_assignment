import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [creatingPost, setCreatingPost] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handlePostUpdate = (updatedPost) => {
        setPosts(posts.map(post =>
            post._id === updatedPost._id ? updatedPost : post
        ));
        setEditingPost(null);
    };

    const handlePostCreate = (newPost) => {
        setPosts([...posts, newPost]);
        setCreatingPost(false);
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setCreatingPost(false);
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    const handleCancelCreate = () => {
        setCreatingPost(false);
    };

    const handleCreateNewPost = () => {
        setCreatingPost(true);
        setEditingPost(null);
    };

    return (
        <div className="container">
            <h1>{editingPost ? `Editing: ${editingPost.title}` : creatingPost ? 'Create New Post' : 'All Posts'}</h1>

            {!editingPost && !creatingPost && (
                <button onClick={handleCreateNewPost} className="create-new-btn">Create New Blog</button>
            )}

            <div className="post-grid">
                {editingPost ? (
                    <PostForm
                        post={editingPost}
                        onSave={async (updatedPost) => {
                            const response = await axios.put(
                                `http://localhost:5000/api/posts/${editingPost._id}`,
                                updatedPost
                            );
                            handlePostUpdate(response.data);
                        }}
                        onCancel={handleCancelEdit}
                    />
                ) : creatingPost ? (
                    <PostForm
                        onSave={async (newPostData) => {
                            const response = await axios.post(
                                'http://localhost:5000/api/posts',
                                newPostData
                            );
                            handlePostCreate(response.data);
                        }}
                        onCancel={handleCancelCreate}
                    />
                ) : (
                    posts.map(post => (
                        <div className="post-item" key={post._id}>
                            <Post
                                post={post}
                                onEdit={handleEdit}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PostList;
