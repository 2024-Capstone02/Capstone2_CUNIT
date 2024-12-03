import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './front/post/home';
import ChungBoard from './front/post/ChungBoard';
import DaeBoard from './front/post/DaeBoard';
import HomeBoard from "./front/post/HomeBoard";
import PostDetail from './front/post/postdetail';
import SeBoard from "./front/post/SeBoard"
import Write from "./front/post/write";
import ChatList from './front/chat/ChatList';
import Chating from './front/chat/Chating';
import MatchingPage from './front/chat/MatchingPage';
import Header from "./front/components/Header";



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
        lastMessage: '...', // 아직 미정. 입력된 최근 데이터를 미리보여주는 기능 포함 할 예정 ***
        timeAgo: '방금',  // 마지막으로 보낸 시간 부터 지금까지 몇 몇분, 몇시간 지났는지 보여줄 예정. ***
        profileImage: 'https://example.com/path/to/image1.png',
    }]);

    const deleteChat = (chatId) => {
        setChats(chats.filter(chat => chat.id !== chatId));
    };

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/Home" element={<Home />} />
                {/*게시판페이지*/}
                <Route path="/ChungBoard" element={<ChungBoard/>}/>
                <Route path="/DaeBoard" element={<DaeBoard/>}/>
                <Route path="/HomeBoard" element={<HomeBoard posts={posts} />} /> {/* posts 전달 */}
                <Route path="/postdetail/:postId" element={<PostDetail posts={posts} />} />
                <Route path="/SeBoard" element={<SeBoard/>}/>
                <Route path="/write" element={<Write addPost={addPost} />} /> {/* addPost 전달 */}
                {/*채팅페이지*/}
                <Route path="/chatlist" element={<ChatList chats={chats} onDeleteChat={deleteChat} />} />
                <Route path="/chat/:chatId" element={<Chating chats={chats} />} />
                <Route path="/matching" element={<MatchingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
