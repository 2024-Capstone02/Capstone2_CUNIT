import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';  // 필요하다면 스타일링을 위한 CSS 파일

function MainPage() {
    const navigate = useNavigate();

    // 페이지 이동 함수
    const goToChatList = () => navigate('/chatlist');
    const goToMatching = () => navigate('/matching');

    return (
        <div className="main-page-container">
            <h1>메인 페이지</h1>
            <button onClick={goToChatList} className="navigation-button">채팅 리스트</button>
            <button onClick={goToMatching} className="navigation-button">1:1 매칭</button>
        </div>
    );
}

export default MainPage;
