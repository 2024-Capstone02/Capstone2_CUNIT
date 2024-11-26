import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import userIcon from '../images/user.png';
import logoIcon from '../images/logo.png';
import bellIcon from '../images/bell.png';

const Header = () => {
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // 채팅 메뉴 상태 추가
    const navigate = useNavigate();

    // 특정 게시판으로 이동하는 함수
    const handleBoardNavigation = (path) => {
        navigate(path);
        setIsBoardOpen(false); // 게시판 메뉴 닫기
    };

    // 특정 채팅 페이지로 이동하는 함수
    const handleChatNavigation = (path) => {
        navigate(path);
        setIsChatOpen(false); // 채팅 메뉴 닫기
    };

    const handleBellClick = () => {
        navigate('/notifications'); // 알림 페이지로 이동
    };

    const handleUserClick = () => {
        navigate('/profile'); // 프로필 페이지로 이동
    };

    return (
        <header className="home-header">
            <div className="home-logo" onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>
                <img src={logoIcon} alt="Logo Icon" className="logo-icon"/>
                <span>CUNIT</span>
            </div>
            <nav className="home-nav-menu">

                {/* 게시판 메뉴 */}
                <div
                    className="dropdown-container"
                    onMouseEnter={() => setIsBoardOpen(true)}
                    onMouseLeave={() => setIsBoardOpen(false)}
                >
                    <a href="#게시판">게시판</a>
                    {isBoardOpen && (
                        <div className="board-menu-horizontal">
                            <div className="board-item" onClick={() => handleBoardNavigation('/HomeBoard')}>통합</div>
                            <div className="board-item" onClick={() => handleBoardNavigation('/ChungBoard')}>충남</div>
                            <div className="board-item" onClick={() => handleBoardNavigation('/DaeBoard')}>대전</div>
                            <div className="board-item" onClick={() => handleBoardNavigation('/SeBoard')}>세종</div>
                        </div>
                    )}
                </div>
                <a href="#캘린더">캘린더</a>
                <a href="#홍보">홍보</a>
                {/* 채팅 메뉴 */}
                <div
                    className="dropdown-container"
                    onMouseEnter={() => setIsChatOpen(true)}
                    onMouseLeave={() => setIsChatOpen(false)}
                >
                    <a href="#채팅">채팅</a>
                    {isChatOpen && (
                        <div className="board-menu-horizontal">
                            <div className="board-item" onClick={() => handleChatNavigation('/chatlist')}>채팅 리스트</div>
                            <div className="board-item" onClick={() => handleChatNavigation('/matching')}>1:1 매칭</div>
                        </div>
                    )}
                </div>
            </nav>
            <div className="home-icons">
                <img
                    src={bellIcon}
                    alt="Bell Icon"
                    className="home-icon home-bell-icon"
                    onClick={handleBellClick}
                    style={{cursor: 'pointer'}}
                />
                <img
                    src={userIcon}
                    alt="User Icon"
                    className="home-icon home-user-icon"
                    onClick={handleUserClick}
                    style={{cursor: 'pointer'}}
                />

            </div>
        </header>
    );
};

export default Header;
