// 통합게시판
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeBoard.css';

const HomeBoard = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 15));
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState('최신순'); // 기본 정렬은 최신순
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterPosts(event.target.value, sortType);
    };

    const filterPosts = (term, sort) => {
        let filtered = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(term.toLowerCase()) ||
                post.content.toLowerCase().includes(term.toLowerCase())
        );

        if (sort === '최신순') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sort === '추천순') {
            filtered.sort((a, b) => b.likes - a.likes);
        }

        setDisplayedPosts(filtered.slice(0, page * 15));
    };

    const loadMorePosts = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        setDisplayedPosts(posts.slice(0, nextPage * 15));
    };

    const handleWriteButtonClick = () => {
        navigate('/write');
    };

    const handlePostClick = (postId) => {
        navigate(`/postdetail/${postId}`);
    };

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        setSortType(selectedSort);
        filterPosts(searchTerm, selectedSort);
    };

    return (
        <div className="home-board">
            <h2 className="board-title">통합 게시판</h2>
            <div className="search-container">
                <select value={sortType} onChange={handleSortChange} className="sort-select">
                    <option value="최신순">최신순</option>
                    <option value="추천순">추천순</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button className="search-button">
                    <img
                        src="/path/to/magnifying-glass-icon.png"
                        alt="검색"
                        className="search-icon"
                    />
                </button>
            </div>
            <div className="posts">
                {displayedPosts.map((post) => (
                    <div key={post.id} className="post" onClick={() => handlePostClick(post.id)}>
                        {post.files && post.files[0] && (
                            <img
                                src={URL.createObjectURL(post.files[0])}
                                alt="미리보기"
                                className="post-thumbnail"
                            />
                        )}
                        <div className="post-content">
                            <div className="post-keyword">
                                <span className={`keyword-label keyword-${post.keyword}`}>
                                    {post.keyword}
                                </span>
                            </div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <div className="post-footer">
                                <span>{post.date}</span> · <span>{post.author}</span> ·{' '}
                                <span>추천 {post.likes}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {displayedPosts.length < posts.length && (
                <button className="load-more" onClick={loadMorePosts}>
                    다음
                </button>
            )}
            <button className="write-button" onClick={handleWriteButtonClick}>
                +
            </button>
        </div>
    );
};

export default HomeBoard;
