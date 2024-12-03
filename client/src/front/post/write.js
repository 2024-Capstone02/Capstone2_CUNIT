// 글쓰는 기능.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './write.css';

const Write = ({ addPost }) => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState([]);
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles(newFiles);
    };

    const handleSubmit = () => {
        let hasError = false;

        if (title.trim() === '') {
            setTitleError(true);
            hasError = true;
        } else {
            setTitleError(false);
        }

        if (content.trim() === '') {
            setContentError(true);
            hasError = true;
        } else {
            setContentError(false);
        }

        if (category === '') {
            alert('카테고리를 선택해주세요!');
            hasError = true;
        }

        if (!hasError) {
            const newPost = {
                id: Date.now(),
                title,
                content,
                author: isAnonymous ? '익명' : '작성자명',
                date: new Date().toLocaleDateString(),
                files: files.length > 0 ? files : null,
                keyword: category, // 카테고리 값 추가
            };

            addPost(newPost);
            navigate('/HomeBoard');
        }
    };

    return (
        <div className="write-container">
            <header className="write-header">
                <button onClick={() => window.history.back()} className="back-button">←</button>
                <h2>글쓰기</h2>
                <button onClick={handleSubmit} className="submit-button">완료</button>
            </header>

            <div className="write-form">
                <div className="anonymous-section">
                    <label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                        />
                        익명 글 설정
                    </label>
                    <p>익명으로 글을 작성하면, 댓글도 모두 익명입니다.</p>
                </div>

                <div className="form-group">
                    <label>카테고리 선택</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="category-select"
                    >
                        <option value="">카테고리 선택</option>
                        <option value="질문">질문</option>
                        <option value="자유">자유</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>제목 (최대 100자)</label>
                    <input
                        type="text"
                        placeholder="제목을 입력해주세요."
                        maxLength="100"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {titleError && <p className="error-message">제목을 입력해주세요!</p>}
                </div>

                <div className="form-group">
                    <label>내용 (최대 2000자)</label>
                    <textarea
                        placeholder="관심사 관련된 게시글만 작성하세요."
                        maxLength="2000"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    {contentError && <p className="error-message">내용을 입력해주세요!</p>}
                    <p className="guidelines">
                        익명으로 문제가 될 글을 작성할 시 경고 없이 서비스 이용이 제한될 수 있습니다.
                    </p>
                </div>

                <div className="form-group">
                    <label>사진/파일 첨부 (선택 / 최대 10개)</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept=".jpg,.png,.pdf,.hwp,.hwpx"
                    />
                    <div className="file-preview">
                        {files.length > 0 && files.map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt="미리보기"
                                className="preview-image"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;
