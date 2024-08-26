import React, { useState } from 'react';

const PostForm = ({ post, onSave, onCancel }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };

        try {
            await onSave(postData);
        } catch (error) {
            console.error('Error saving the post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="form-actions">
                <button type="submit">{post ? 'Save' : 'Create'}</button>
                <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
            </div>
        </form>
    );
};

export default PostForm;
