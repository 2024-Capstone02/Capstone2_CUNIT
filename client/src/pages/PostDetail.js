import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../pages/PostDetail.css';

function PostDetail() {
    const { postId } = useParams(); // URL에서 postId를 가져옴
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 서버에서 게시글 데이터 가져오기
        axios.get(`http://localhost:3001/api/posts/${postId}`)
            .then(response => {
                setPost(response.data);
                setComments(response.data.comments || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
                setError("게시글을 불러오는 중 오류가 발생했습니다.");
                setLoading(false);
            });
    }, [postId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === "") {
            setError("댓글을 입력해주세요.");
            return;
        }

        const commentData = {
            content: comment,
            name: "익명",
        };

        // 서버에 댓글 추가 요청
        axios.post(`http://localhost:3001/api/posts/${postId}/comments`, commentData)
            .then(response => {
                setComments([...comments, response.data]);
                setComment("");
                setError("");
            })
            .catch(error => {
                console.error("댓글 추가 중 오류 발생:", error);
            });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container">
            <div className="post-header">
                <div className="post-title-container">
                    <h2 className="post-title">{post.title}</h2>
                </div>
                <div className="menu-container">
                    <button className="menu-button" onClick={toggleMenu}>⋮</button>
                    {isMenuOpen && (
                        <div className="dropdown-menu" style={{ position: 'absolute', top: '40px', left: '0px' }}>
                            <button onClick={() => navigate(`/edit/${post.id}`)}>수정</button>
                            <button>삭제</button>
                        </div>
                    )}
                </div>
            </div>

            <p className="post-content">{post.content}</p>

            <h3>댓글</h3>
            <form onSubmit={handleCommentSubmit} className="comment-form">
                {error && <p className="error-message">{error}</p>}
                <div className="comment-options">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        required
                    />
                    <button type="submit">댓글 작성</button>
                </div>
            </form>

            <div className="comment-list">
                {comments.map((commentData, index) => (
                    <div key={index} className="comment-item">
                        <strong>{commentData.name}:</strong> {commentData.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

// *** 해당 게시글을 찾을 수 없습니다.*** 라고 계속 뜸. (서버와 데이터 통신 오류인 것 같음. 수정해야함.
export default PostDetail;
