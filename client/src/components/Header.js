import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // 스타일링을 위한 CSS 파일

function Header({ title, imageSrc }) {
    const navigate = useNavigate();

    // 뒤로가기 버튼 핸들러
    const handleBackClick = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    // 메뉴 버튼 클릭 핸들러 (필요시 사용)
    const handleMenuClick = () => {
        console.log("메뉴 버튼 클릭됨");
    };

    return (
        <div className="header-container">
            <button className="back-button" onClick={handleBackClick}>뒤로가기</button>
            <div className="title-container">
                {imageSrc && <img src={imageSrc} alt="Icon" className="header-icon" />} {/* 이미지 경로를 props로 받아서 렌더링 */}
                <h1 className="header-title">{title}</h1>
            </div>
            <button className="menu-button" onClick={handleMenuClick}>메뉴</button>
        </div>
    );
}

export default Header;
