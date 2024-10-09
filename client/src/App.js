import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainBoard from './pages/MainBoard';
import WritePost from './pages/WritePost';
import EditPost from './pages/EditPost';
import RegionSpecificBoard from './pages/RegionSpecificBoard';
import ChatList from './front/chat/ChatList';
import Chating from './front/chat/Chating';
import MatchingPage from './front/chat/MatchingPage';
import MainPage from './front/chat/MainPage';
import PostDetail from './pages/PostDetail'; // PostDetail 컴포넌트 추가

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 서버로부터 게시글 데이터를 가져옴
        axios.get('http://localhost:3001/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
            });
    }, []);

    const addPost = (post) => {
        axios.post('http://localhost:3001/api/posts', post)
            .then(response => {
                setPosts([...posts, response.data]);
            })
            .catch(error => {
                console.error("게시글 추가 중 오류 발생:", error);
            });
    };

    const updatePost = (postId, updatedPost) => {
        axios.put(`http://localhost:3001/api/posts/${postId}`, updatedPost)
            .then(response => {
                setPosts(posts.map(post =>
                    post.id === Number(postId) ? response.data : post
                ));
            })
            .catch(error => {
                console.error("게시글 수정 중 오류 발생:", error);
            });
    };

    const deletePost = (postId) => {
        axios.delete(`http://localhost:3001/api/posts/${postId}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== Number(postId)));
            })
            .catch(error => {
                console.error("게시글 삭제 중 오류 발생:", error);
            });
    };

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
                <Route path="/mainboard" element={<MainBoard posts={posts} deletePost={deletePost} />} />
                <Route path="/write" element={<WritePost addPost={addPost} />} />
                <Route path="/edit/:postId" element={<EditPost posts={posts} updatePost={updatePost} deletePost={deletePost} />} />
                <Route path="/region/:region" element={<RegionSpecificBoard posts={posts} />} />
                <Route path="/post/:postId" element={<PostDetail posts={posts} addComment={() => {}} deletePost={deletePost} currentUserId={1} />} /> {/* PostDetail 라우팅 추가 */}
            </Routes>
        </Router>
    );
}

export default App;
