import React, { useState, useEffect, useRef } from 'react';
import './Chating.css';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';  // Socket.IO 클라이언트 임포트
import Header from '../components/Header';  // 경로 수정
import ManIcon from '../images/ManIcon.png';
import GirlIcon from '../images/GirlIcon.png';
import ChatIcon from '../images/ChatIcon.png';

const socket = io('http://localhost:3001');  // Socket.IO 서버에 연결

const Chating = ({ chats }) => {
    const { chatId } = useParams();
    const chat = chats.find(c => c.id === parseInt(chatId));
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [attachedFile, setAttachedFile] = useState(null);
    const messagesEndRef = useRef(null);  // 스크롤 조정을 위한 ref

    // 서버에서 메시지 및 파일 수신 리스너를 등록하는 useEffect
    useEffect(() => {
        const handleReceiveMessage = (message) => {
            // 중복 실행을 막기 위해 디버깅 로그 추가
            console.log('받은 메시지:', message);
            setMessages((prevMessages) => {
                // 메시지가 중복으로 추가되지 않도록 처리
                if (prevMessages.find((m) => m.text === message.text)) {
                    return prevMessages; // 이미 있는 메시지면 추가하지 않음
                }
                return [...prevMessages, message];
            });
        };

        const handleReceiveFile = (fileData) => {
            console.log('받은 파일:', fileData);
            setMessages((prevMessages) => {
                // 파일이 중복으로 추가되지 않도록 처리
                if (prevMessages.find((m) => m.file && m.file.url === fileData.file.url)) {
                    return prevMessages; // 이미 있는 파일이면 추가하지 않음
                }
                return [...prevMessages, fileData];
            });
        };

        // 메시지 및 파일 수신 리스너 등록
        socket.on('receiveMessage', handleReceiveMessage);
        socket.on('receiveFile', handleReceiveFile);

        // 클린업 함수: 컴포넌트가 언마운트될 때 리스너 제거
        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            socket.off('receiveFile', handleReceiveFile);
        };
    }, []);  // 빈 배열로 설정하여 한 번만 실행

    useEffect(() => {
        // 메시지가 변경될 때마다 스크롤을 하단으로 이동
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        // 서버로부터 메시지 삭제 알림을 수신
        const handleDeletedMessage = (messageId) => {
            setMessages((prevMessages) => prevMessages.filter((m) => m.id !== messageId));
        };

        socket.on('messageDeleted', handleDeletedMessage);

        return () => {
            socket.off('messageDeleted', handleDeletedMessage);
        };
    }, []);

    if (!chat) {
        return <p>채팅방을 찾을 수 없습니다.</p>;
    }

    // 성별에 따른 프로필 이미지 선택
    const profileImage = chat.gender === 'male' ? ManIcon : GirlIcon;

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (newMessage.trim() !== '' || attachedFile) {
            const message = {
                id: Date.now(),  // 고유한 ID 추가 (Date.now() 사용)
                sender: '나',
                text: newMessage,
                isSender: true,
                file: attachedFile ? {
                    name: attachedFile.name,
                    url: URL.createObjectURL(attachedFile),
                    type: attachedFile.type.split('/')[0]
                } : null
            };

            // 클라이언트에서 보낸 메시지를 서버로 전송
            socket.emit('sendMessage', message);

            setMessages([...messages, message]);  // 메시지 목록에 추가
            setNewMessage('');  // 전송 후 입력창 초기화
            setAttachedFile(null);  // 파일 상태 초기화
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleFileChange = (e) => {
        setAttachedFile(e.target.files[0]);
    };

    const handleDeleteMessage = (messageId) => {
        console.log('삭제 요청 보내기, ID:', messageId); // 디버깅용 콘솔 로그
        socket.emit('deleteMessage', messageId);
        setMessages(messages.filter(msg => msg.id !== messageId)); // 클라이언트에서 즉시 제거 (옵션)
    };



    return (
        <div className="chat-room-container">
            <Header title="채팅" imageSrc={ChatIcon} />
            <div className="chat-room-content">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.isSender ? 'my-message' : 'other-message'}`}
                    >
                        {!message.isSender && <img src={profileImage} alt="profile" className="profile-image" />}
                        <div className={`message-bubble ${message.isSender ? 'my-bubble' : 'other-bubble'}`}>
                            <p>{message.text}</p>
                            {message.file && (
                                <div className="attached-file">
                                    {message.file.type === 'image' && <img src={message.file.url} alt="attached" className="attached-preview" />}
                                    {message.file.type === 'video' && <video controls className="attached-preview"><source src={message.file.url} type={message.file.type} /></video>}
                                    {message.file.type !== 'image' && message.file.type !== 'video' && (
                                        <a href={message.file.url} download={message.file.name} className="download-link">다운로드: {message.file.name}</a>
                                    )}
                                </div>
                            )}
                        </div>
                        {message.isSender && <img src={profileImage} alt="profile" className="profile-image" />}
                        {/* 메시지 삭제 버튼 추가 */}
                        {message.isSender && (
                            <button
                                className="delete-message-button"
                                onClick={() => handleDeleteMessage(message.id)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="chat-input"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-input"
                    style={{ display: 'none' }}
                    id="file-attach"
                />
                <label htmlFor="file-attach" className="file-attach-button">
                    파일 첨부
                </label>
                {attachedFile && (
                    <div className="attached-file-info">
                        {attachedFile.type.startsWith('image') && (
                            <img src={URL.createObjectURL(attachedFile)} alt="attached preview" className="attached-preview" />
                        )}
                        <p>{attachedFile.name}</p>
                    </div>
                )}
                <button onClick={handleSendMessage} className="send-button">전송</button>
            </div>
        </div>
    );
};

export default Chating;
