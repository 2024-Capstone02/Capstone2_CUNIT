import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './Event_list.css';

const EventList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
    const [recruitment, setRecruitment] = useState(JSON.parse(localStorage.getItem('recruitment')) || []);
    const [activeTab, setActiveTab] = useState('event');
    const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가

    // 이벤트나 모집이 새로 추가되었을 때
    useEffect(() => {
        if (location.state && location.state.newEvent) {
            const { category, newEvent } = location.state;

            // 게시글 작성 시각 (createdAt)
            const createdAt = new Date().toISOString(); // 게시글 작성 시각 기록
            const eventWithTimestamp = { ...newEvent, createdAt }; // 작성 시각 추가

            // "행사"와 "모집" 카테고리에 따라 적절히 저장
            if (category === "행사") {
                const updatedEvents = [...events, eventWithTimestamp];
                setEvents(updatedEvents);
                localStorage.setItem('events', JSON.stringify(updatedEvents));
            } else if (category === "모집") {
                const updatedRecruitment = [...recruitment, eventWithTimestamp];
                setRecruitment(updatedRecruitment);
                localStorage.setItem('recruitment', JSON.stringify(updatedRecruitment));
            }
        }
    }, [location.state, events, recruitment]);

    // 게시글을 작성된 순서대로 (최신순) 정렬
    const sortPosts = (posts) => {
        return posts.slice().reverse();  // .reverse()는 원본을 변형시키므로, 복사본을 뒤집어서 반환
    };

    // 검색 필터링
    const filteredPosts = (posts) => {
        return posts.filter(post =>
            post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // 탭 변경
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePostClick = (post) => {
        navigate('/Event_detail', { state: { post } });
    };

    const handleBackClick = () => {
        navigate('/');
    };

    // 게시 요청 버튼 함수
    const post_req_btn = () => {
        navigate('/post_req');
    };

    // 정렬 옵션 변경
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    // 검색어 입력 변화 처리
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>진행 이벤트</h1>
                <nav className="menu">
                    <div
                        className={`menu-item ${activeTab === 'event' ? 'active' : ''}`}
                        onClick={() => handleTabChange('event')}
                    >
                        행사
                    </div>
                    <div
                        className={`menu-item ${activeTab === 'recruitment' ? 'active' : ''}`}
                        onClick={() => handleTabChange('recruitment')}
                    >
                        모집
                    </div>
                </nav>
                {/* 검색 기능 추가 */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="검색..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                {/* 정렬 옵션 추가 */}
                <div className="sort-container">
                    <label>정렬: </label>
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="latest">최신순</option>
                        <option value="oldest">오래된순</option>
                    </select>
                </div>
            </header>

            {/* 게시글 리스트 */}
            {(activeTab === 'event' ? sortPosts(filteredPosts(events)) : sortPosts(filteredPosts(recruitment))).length === 0 ? (
                <div>게시글이 없습니다.</div>
            ) : (
                (activeTab === 'event' ? sortPosts(filteredPosts(events)) : sortPosts(filteredPosts(recruitment))).map((item, index) => (
                    <div className="event-box" key={index} onClick={() => handlePostClick(item)}>
                        <div className="image-container">
                            <img src={item.uploadImgUrl} alt="Event" className="event-image" />
                        </div>
                        <div className="event-details">
                            <div className="event-title">{item.title}</div>
                            <div className="event-date">{item.date}</div> {/* 행사 날짜 */}
                        </div>
                    </div>
                ))
            )}

            {/* 버튼들을 세로로 배치할 컨테이너 */}
            <div className="button-container">
                <button onClick={post_req_btn} className={"post_req_btn"}>
                    게시 요청
                </button>
                <button className="back-button" onClick={handleBackClick}>
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default EventList;
