import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Header 컴포넌트 가져오기
import '../pages/MainBoard.css';

function MainBoard({ posts, deletePost }) {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태 관리
    const [isMenuOpen, setIsMenuOpen] = useState(null); // 특정 게시글의 메뉴 열림 상태 관리

    // 게시물 필터링 함수
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        post.content.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // 메뉴 열기/닫기 토글 함수
    const toggleMenu = (postId) => {
        setIsMenuOpen(isMenuOpen === postId ? null : postId);
    };

    // 게시물 삭제 핸들러
    const handleDeletePost = (postId) => {
        deletePost(postId); // props로 전달된 deletePost 사용
    };

    return (
        <div className="container">
            {/* Header 컴포넌트 삽입 */}
            <Header title="메인게시판" />

            {/* 검색창 */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* 게시글 리스트 */}
            <div className="post-list">
                {filteredPosts.map((post) => (
                    <div
                        className="post-item"
                        key={post.id}
                        onClick={() => navigate(`/post/${post.id}`)} // 게시글 클릭 시 상세 페이지로 이동
                    >
                        <h2 className="post-header">{post.title}</h2>
                        <p className="post-content">{post.content}</p>
                        {/* 점 세 개 메뉴 버튼 */}
                        <button
                            className="menu-button"
                            onClick={(e) => {
                                e.stopPropagation(); // 메뉴 버튼 클릭 시 게시글 상세로 이동하지 않도록 방지
                                toggleMenu(post.id);
                            }}
                        >
                            ⋮
                        </button>
                        {isMenuOpen === post.id && (
                            <div className="dropdown-menu">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/edit/${post.id}`);
                                }}>
                                    수정
                                </button>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePost(post.id);
                                }}>
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 글쓰기 버튼 */}
            <button className="write-button" onClick={() => navigate("/write")}>
                글쓰기 +
            </button>
        </div>
    );
}

// *** ...오른쪽 게시글 버튼을 누르면 수정, 삭제 버튼이 ...버튼 좌측에 또는 아래 정렬 및 좌로정렬 되어 보이도록 수정해야함.
// *** 상단 헤더쪽 메뉴버튼도 수정해야함. 메뉴버튼이 가로로 보여야 하며, 오른쪽 상단에 위치. (헤더 파일과 메인게시판 파일에서 Header끼리 충돌하는 것 같음.
export default MainBoard;
