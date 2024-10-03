import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatList from './pages/ChatList';  // ChatList를 pages 폴더에서 가져옴
import Chating from './pages/Chating';
import MatchingPage from './pages/MatchingPage';
import MainPage from './pages/MainPage';

function App() {
    const [chats, setChats] = useState([{
        id: 1,
        schoolName: '배재대학교',
        lastMessage: '안녕하세요',
        timeAgo: '방금',
        profileImage: 'https://example.com/path/to/image1.png',
    }]);

    const deleteChat = (chatId) => {
        setChats(chats.filter(chat => chat.id !== chatId));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/chatlist" element={<ChatList chats={chats} onDeleteChat={deleteChat} />} />
                <Route path="/chat/:chatId" element={<Chating chats={chats} />} />
                <Route path="/matching" element={<MatchingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
