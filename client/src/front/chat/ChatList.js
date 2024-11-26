import React from 'react';
import {useNavigate} from 'react-router-dom';
import './ChatList.css';
import Header from '../components/Header';
import ManIcon from '../images/ManIcon.png';
import GirlIcon from '../images/GirlIcon.png';
import ChatIcon from '../images/ChatIcon.png';

const ChatList = ({chats = [], onDeleteChat}) => {  // chats의 기본값을 빈 배열로 설정
    const navigate = useNavigate();

    // 채팅방 클릭 시 해당 채팅방으로 이동하는 함수
    const handleChatClick = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    return (
        <div className="chat-list-container">
            <Header title="채팅 목록"/>
            <div className="chat-list">
                {chats.length > 0 ? (
                    chats.map(chat => (
                        <div
                            className="chat-item"
                            key={chat.id}
                            onClick={() => handleChatClick(chat.id)}
                        >
                            <div className="profile-section">
                                <img src={ManIcon} alt="profile" className="profile-image"/>
                            </div>
                            <div className="chat-details">
                                <div className="school-name">{chat.schoolName}</div>
                                <div className="message">{chat.lastMessage}</div>
                            </div>
                            <div className="time-and-delete">
                                <div className="time">{chat.timeAgo}</div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();  // 부모 요소의 클릭 이벤트가 실행되지 않도록 방지
                                        onDeleteChat(chat.id);
                                    }}
                                    className="delete-button"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>채팅방이 없습니다.</p>
                )}
            </div>
        </div>
    );
};
// <img src={chat.profileImage} alt="profile" className="profile-image" /> 는 채팅방 프로필 사용자간에 프로필 가져오기.
export default ChatList;
