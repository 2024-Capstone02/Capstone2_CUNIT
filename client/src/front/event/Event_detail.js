import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Event_detail.css';

const EventDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const post = location.state?.post;

    if (!post) {
        return <div>게시글이 없습니다.</div>;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDelete = () => {
        // 삭제 로직: 서버에 삭제 요청을 보내거나, 페이지 상태에서 제거
        if (window.confirm("정말 삭제하시겠습니까?")) {
            // 여기서는 간단히 이전 페이지로 돌아가는 예시
            // 서버와 연동할 경우 API를 호출해 삭제 요청을 보냅니다.
            navigate('/Event_list', { state: { deletedEventId: post.id } });
        }
    };

    return (
        <div className="event-detail">
            <h1>{post.title}</h1>
            {post.uploadImgUrl && <img src={post.uploadImgUrl} alt="Event" className="event-image" />}
            <p><strong>일시:</strong> {post.date}</p>
            <p><strong>장소:</strong> {post.location}</p>
            <p><strong>내용:</strong> {post.content}</p>
            <p><strong>카테고리:</strong> {post.category}</p>
            <div>
                <button className="chat-button">채팅</button>
                <button className="delete-button" onClick={handleDelete}>삭제</button>
                <button className="back-button" onClick={handleGoBack}>뒤로가기</button>
            </div>
        </div>
    );
};

export default EventDetail;
