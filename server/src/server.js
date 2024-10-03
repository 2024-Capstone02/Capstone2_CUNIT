const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',  // 클라이언트 URL (React 개발 서버)
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

app.use(cors());
app.use(express.json()); // JSON 파싱을 위한 미들웨어 추가

let posts = [
    { id: 1, title: '첫 번째 게시글', content: '첫 번째 게시글 내용', author: 'user1', comments: [] },
    { id: 2, title: '두 번째 게시글', content: '두 번째 게시글 내용', author: 'user2', comments: [] }
];

// 게시글 API - 목록 가져오기
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 게시글 API - 추가
app.post('/api/posts', (req, res) => {
    const newPost = { id: posts.length + 1, ...req.body, comments: [] };
    posts.push(newPost);
    res.status(201).json(newPost);
    console.log('새 게시글이 추가되었습니다:', newPost);
});

// 게시글 API - 특정 게시글 가져오기 (PostDetail에서 사용)
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).send('게시글을 찾을 수 없습니다.');
    }
});

// 게시글 API - 수정
app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedPost = req.body;

    posts = posts.map(post => post.id === postId ? { ...post, ...updatedPost } : post);
    res.json(updatedPost);
    console.log(`게시글이 수정되었습니다. ID: ${postId}`);
});

// 게시글 API - 삭제
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.status(204).send();
    console.log(`게시글이 삭제되었습니다. ID: ${postId}`);
});

// 댓글 API - 특정 게시글에 댓글 추가
app.post('/api/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        const newComment = { id: post.comments.length + 1, ...req.body };
        post.comments.push(newComment);
        res.status(201).json(newComment);
        console.log('새 댓글이 추가되었습니다:', newComment);
    } else {
        res.status(404).send('게시글을 찾을 수 없습니다.');
    }
});

// 댓글 API - 댓글 삭제
app.delete('/api/posts/:postId/comments/:commentId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    const post = posts.find(post => post.id === postId);

    if (post) {
        post.comments = post.comments.filter(comment => comment.id !== commentId);
        res.status(204).send();
        console.log(`댓글이 삭제되었습니다. ID: ${commentId}`);
    } else {
        res.status(404).send('게시글을 찾을 수 없습니다.');
    }
});

// 기본 응답
app.get('/', (req, res) => {
    res.send('서버가 실행 중입니다.');
});

// Socket.IO 연결 및 메시지 처리
io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    // 클라이언트에서 메시지 수신
    socket.on('sendMessage', (message) => {
        console.log('받은 메시지:', message);
        // 모든 클라이언트에게 메시지 전송
        io.emit('receiveMessage', message);
    });

    // 클라이언트에서 파일 수신
    socket.on('sendFile', (fileData) => {
        console.log('받은 파일:', fileData);
        io.emit('receiveFile', fileData);
    });

    socket.on('disconnect', () => {
        console.log('사용자가 연결을 끊었습니다.');
    });
});

// 서버 실행
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
