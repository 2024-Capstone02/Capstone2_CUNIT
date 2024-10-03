import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostList({ posts }) {
    const navigate = useNavigate();
    const [menuOpenPostId, setMenuOpenPostId] = useState(null);

    const toggleMenu = (postId) => {
        setMenuOpenPostId(menuOpenPostId === postId ? null : postId);
    };

    return (
        <div>
            {posts.map((post) => (
                <div className="post-item" key={post.id}>
                    <div className="post-header-container">
                        <h2 className="post-header" onClick={() => navigate(`/post/${post.id}`)}>
                            {post.title}
                        </h2>
                        <button className="menu-button" onClick={() => toggleMenu(post.id)}>⋮</button>
                        {menuOpenPostId === post.id && (
                            <div className="dropdown-menu">
                                <button onClick={() => navigate(`/edit/${post.id}`)}>수정</button>
                                <button onClick={() => console.log("삭제 클릭")}>삭제</button>
                            </div>
                        )}
                    </div>
                    <p className="post-content">{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;