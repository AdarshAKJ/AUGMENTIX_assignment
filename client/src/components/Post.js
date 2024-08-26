import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Post = ({ post, onEdit }) => {
    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
        window.location.reload();
    };

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="post-actions">
                <button onClick={() => onEdit(post)} className="edit-btn">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

export default Post;
