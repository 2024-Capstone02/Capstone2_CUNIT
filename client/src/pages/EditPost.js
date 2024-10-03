import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../pages/EditPost.css'; // 스타일 파일 추가

function EditPost({ posts, updatePost, deletePost }) {
    const { postId } = useParams(); // URL에서 postId 추출
    const post = posts.find((post) => post.id === Number(postId)); // 게시물 찾기
    const [title, setTitle] = useState(post?.title || ''); // 게시물 제목
    const [content, setContent] = useState(post?.content || ''); // 게시물 내용
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태 관리
    const navigate = useNavigate();

    // 메뉴 열기/닫기 토글 함수
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 게시물 수정 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = { title, content };
        updatePost(Number(postId), updatedPost);
        navigate(`/post/${postId}`); // 수정 후 해당 게시물로 이동
    };

    // 게시물 삭제 핸들러
    const handleDeletePost = () => {
        deletePost(Number(postId)); // 게시물 삭제
        navigate('/'); // 메인 페이지로 이동
    };

    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="edit-post-container">
            <div className="post-header">
                <h2>{post.title}</h2>
                <div className="menu-container">
                    <button className="menu-button" onClick={toggleMenu}>⋮</button>
                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleSubmit}>수정</button>
                            <button onClick={handleDeletePost}>삭제</button>
                        </div>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>내용</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
}

export default EditPost;