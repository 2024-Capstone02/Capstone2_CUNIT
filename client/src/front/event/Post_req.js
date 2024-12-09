import { useNavigate } from 'react-router-dom';
import Editor from "./Editor";
import { useState } from 'react';

const Post_req = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("행사"); // 기본 카테고리 상태 추가

    const handleSubmit = (state) => {
        const newEvent = {
            title: state.title,
            description: state.content,
            category: state.category, // 카테고리 추가
        };
        navigate('/Event_list', { state: { newEvent } });
        alert("작성 완료!");
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div>
            <Editor
                initData={{
                    date: new Date().getTime(),
                    emotionId: 1,
                    content: "이전에 작성했던 요청글",
                    category, // 카테고리 초기화
                }}
                onSubmit={handleSubmit}
                onChangeCategory={handleChangeCategory} // 카테고리 변경 핸들러 전달
            />
        </div>
    );
};

export default Post_req;