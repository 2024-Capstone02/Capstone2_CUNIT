import React, { useState } from 'react';
import Header from '../components/Header';  // 경로 수정
import './MatchingPage.css';
import { useNavigate } from 'react-router-dom';

// 이미지 파일 불러오기
import ManIcon from '../assets/images/ManIcon.png';
import GirlIcon from '../assets/images/GirlIcon.png';

function MatchingPage({ onMatch }) {
    const [isMatching, setIsMatching] = useState(false);
    const [isMatched, setIsMatched] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('');  // 지역 상태 추가
    const navigate = useNavigate();

    const startMatching = async () => {
        if (!selectedRegion) {
            alert("지역을 선택해주세요.");
            return;
        }

        setIsMatching(true);
        setIsMatched(false);

        // 서버에 매칭 요청
        try {
            const response = await fetch('http://localhost:3001/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ region: selectedRegion }),
            });

            const matchedUser = await response.json();

            onMatch({
                id: matchedUser.id,
                schoolName: matchedUser.schoolName,
                lastMessage: '안녕하세요! 매칭되었습니다.',
                timeAgo: '방금',
                profileImage: matchedUser.profileImage,
            });

            setIsMatching(false);
            setIsMatched(true);
            navigate('/chatlist');  // 채팅 리스트 페이지로 이동
        } catch (error) {
            console.error('매칭 실패:', error);
            setIsMatching(false);
        }
    };

    return (
        <div className="matching-page-container">
            <Header title="1:1 매칭" />
            <div className="main-content">
                {/* 지역 선택 UI 추가 */}
                <div className="region-select">
                    <label htmlFor="region">지역 선택: </label>
                    <select
                        id="region"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="">-- 지역 선택 --</option>
                        <option value="대전">대전</option>
                        <option value="세종">세종</option>
                        <option value="충남">충남</option>
                    </select>
                </div>

                <button onClick={startMatching} disabled={isMatching || isMatched} className="start-matching-button">
                    {isMatching ? '매칭 중...' : isMatched ? '매칭 완료' : '1:1 매칭 시작'}
                </button>

                {isMatching && <p className="status-message">상대방을 찾고 있습니다...</p>}
                {isMatched && <p className="status-message">채팅할 상대를 찾았습니다!</p>}
            </div>
        </div>
    );
}

export default MatchingPage;
