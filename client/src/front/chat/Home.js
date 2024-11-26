import React from 'react';
import profileIcon from '../images/profile.png';
import './Home.css';
import Header from '../components/Header'; // 경로 수정

const Home = ({
                  user = {},
                  onLogout = () => alert('로그아웃 버튼 클릭됨'),
                  onMyInfo = () => alert('내정보 버튼 클릭됨'),
              }) => {
    return (
        <div>
            {/* 상단에 Header 컴포넌트 추가 */}
            <Header />

            {/* 홈 페이지의 메인 컨텐츠 */}
            <div className="home-content">
                <div className="profile-container">
                    <div className="profile-section">
                        <img
                            src={profileIcon}
                            alt="프로필 아이콘"
                            className="profile-icon"
                        />
                        {/* 사용자 이름과 아이디 표시 */}
                        <div className="user-info">
                            <p className="user-name">
                                {user.name || '사용자 이름'}
                            </p>
                            <p className="user-id">
                                {user.id || '사용자 아이디'}
                            </p>
                        </div>
                        {/* 버튼 영역 */}
                        <div className="button-container">
                            <button
                                onClick={onMyInfo}
                                className="info-button"
                            >
                                내정보
                            </button>
                            <button
                                onClick={onLogout}
                                className="logout-button"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
