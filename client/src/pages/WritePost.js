import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/WritePost.css';

function WritePost({ addPost }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]); // 파일 리스트
    const [board, setBoard] = useState('통합'); // 게시판 선택 상태
    const [anonymous, setAnonymous] = useState(false); // 익명 설정 상태
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (files.length > 10) {
            alert('최대 10개까지 업로드할 수 있습니다.');
            return;
        }
        addPost({ title, content, files, board, anonymous });
        navigate('/'); // 글쓰기 완료 후 통합 게시판으로 이동
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + files.length > 10) {
            alert('최대 10개까지만 선택할 수 있습니다.');
        } else {
            setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        }
    };

    const renderPreview = (file) => {
        if (file.type.startsWith('image/')) {
            return <img key={file.name} src={URL.createObjectURL(file)} alt="preview" className="preview-image" />;
        } else if (file.type.startsWith('video/')) {
            return <video key={file.name} width="100" controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
            </video>;
        } else {
            return <div key={file.name}>
                <a href={URL.createObjectURL(file)} download>{file.name}</a>
            </div>;
        }
    };

    return (
        <div className="write-container">
            <button className="back-button" onClick={() => navigate('/')}>뒤로가기</button>

            <h2 className="write-header">글쓰기</h2>

            <label className="anonymous-label">
                익명 글 설정
                <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={() => setAnonymous(!anonymous)}
                    className="anonymous-checkbox"
                />
            </label>

            <label className="board-label">
                게시판 선택
                <select value={board} onChange={(e) => setBoard(e.target.value)} className="board-select">
                    <option value="통합">통합</option>
                    <option value="대전">대전</option>
                    <option value="세종">세종</option>
                    <option value="충남">충남</option>
                </select>
            </label>

            <label className="title-label">
                제목 (최대 100자)
                <input
                    type="text"
                    className="post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="100"
                />
            </label>

            <label className="content-label">
                내용 (최대 2000자)
                <textarea
                    className="post-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength="2000"
                />
            </label>

            <label className="file-label">
                파일 첨부 (사진, 동영상, 문서 선택 가능 / 최대 10개)
                <input
                    type="file"
                    accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
                    multiple
                    onChange={handleFileChange}
                    className="file-input"
                />
            </label>

            {/* 파일 미리보기 */}
            <div className="file-preview">
                {files.map((file) => renderPreview(file))}
            </div>

            <button type="submit" className="submit-button" onClick={handleSubmit}>완료</button>
        </div>
    );
}

export default WritePost;