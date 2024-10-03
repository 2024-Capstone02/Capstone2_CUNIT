const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',  // 클라이언트 URL (React 개발 서버)
        methods: ['GET', 'POST']
    }
});

// 서버에서 요청에 대한 기본 응답
app.get('/', (req, res) => {
    res.send('서버가 실행 중입니다.');
});

// Socket.IO 연결 및 메시지 처리
io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    // 클라이언트에서 메시지 수신
    socket.on('sendMessage', (message) => {
        console.log('받은 메시지:', message);
        // 클라이언트에게 메시지를 다시 보내지 않도록, 메시지를 보낸 클라이언트를 제외한 다른 클라이언트에게만 전송
        socket.broadcast.emit('receiveMessage', message);
    });

    // 클라이언트에서 파일 수신
    socket.on('sendFile', (fileData) => {
        console.log('받은 파일:', fileData);
        socket.broadcast.emit('receiveFile', fileData);
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
