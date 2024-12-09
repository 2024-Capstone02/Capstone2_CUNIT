import './Editor.css';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from "./util"; // 날짜 포맷팅 유틸
import Btn from "./Btn";
import { useState, useEffect } from "react";

const Editor = ({ initData, onSubmit }) => {
    const [state, setState] = useState({
        date: getFormattedDate(new Date()), // 초기 날짜 설정
        title: "", // 제목
        location: "", // 장소
        content: "", // 내용
        uploadImgUrl: "", // 이미지 URL
        category: "행사", // 카테고리 기본값
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))), // 날짜 포맷팅
            });
        }
    }, [initData]);

    const handleChangeMenu = (e) => {
        setState({
            ...state,
            category: e.target.value, // 선택한 카테고리 저장
        });
    };

    const handleChangeTitle = (e) => {
        setState({
            ...state,
            title: e.target.value,
        });
    };

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    const handleChangeLocation = (e) => {
        setState({
            ...state,
            location: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];
        if (uploadFile) {
            const reader = new FileReader();
            reader.readAsDataURL(uploadFile);
            reader.onloadend = () => {
                setState({
                    ...state,
                    uploadImgUrl: reader.result,
                });
            };
        }
    };

    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    const handleSubmit = () => {
        onSubmit(state);
        const newEvent = state;
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const recruitment = JSON.parse(localStorage.getItem('recruitment')) || [];

        if (newEvent.category === '행사') {
            localStorage.setItem('events', JSON.stringify([...events, newEvent]));
        } else if (newEvent.category === '모집') {
            localStorage.setItem('recruitment', JSON.stringify([...recruitment, newEvent]));
        }

        navigate('/Event_list', { state: { newEvent } });
    };

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>이벤트 카테고리</h4>
                <div className="input_wrapper">
                    <select value={state.category} onChange={handleChangeMenu}>
                        <option value="행사">행사</option>
                        <option value="모집">모집</option>
                    </select>
                </div>
            </div>

            <div className="editor_section">
                <h4>제목</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="제목 입력"
                        value={state.title}
                        onChange={handleChangeTitle}
                    />
                </div>
            </div>

            <div className="editor_section">
                <h4>날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate} />
                </div>
            </div>

            <div className="editor_section">
                <h4>장소</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="장소 입력"
                        value={state.location}
                        onChange={handleChangeLocation}
                    />
                </div>
            </div>

            <div className="editor_section">
                <h4>내용</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="내용 입력"
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>

            <div className="editor_section">
                <h4>사진</h4>
                <div className="input_wrapper">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChangeImage}
                    />
                    {state.uploadImgUrl && (
                        <img
                            src={state.uploadImgUrl}
                            alt="Uploaded Preview"
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                        />
                    )}
                </div>
            </div>

            <br/>

            <div className="editor_section bottom_section">
                <Btn text={"취소"} onClick={handleOnGoBack} />
                <Btn text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;
