import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';  // 필요하다면 스타일링을 위한 CSS 파일

function MainPage() {
    const navigate = useNavigate();

    // 페이지 이동 함수
    const goToChatList = () => navigate('/chatlist');
    const goToMatching = () => navigate('/matching');
    const goToMainBoard = () => navigate('/mainboard'); // 경로 수정 (소문자 사용)
    const goToRegionSpecificBoard = () => navigate('/region/some-region');  // 임시로 'some-region' 사용
    const goToEditPost = () => navigate('/edit/1');  // 임시로 postId를 1로 사용

    return (
        <div className="main-page-container">
            <h1>메인 페이지</h1>
            <button onClick={goToChatList} className="navigation-button">채팅 리스트</button>
            <button onClick={goToMatching} className="navigation-button">1:1 매칭</button>
            <button onClick={goToMainBoard} className="navigation-button">메인 게시판</button>
            <button onClick={goToRegionSpecificBoard} className="navigation-button">지역별 게시판</button>
            <button onClick={goToEditPost} className="navigation-button">글 수정</button>
        </div>
    );
}

export default MainPage;
