import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import header from "../components/Header";
import Header from "../components/Header";

function RegionSpecificBoard({ posts }) {
    const { region } = useParams(); // URL에서 지역명을 받음
    const navigate = useNavigate();

    // 해당 지역의 게시글만 필터링
    const regionPosts = posts.filter(post => post.region === region);

    return (
        <div className="container">
            <Header title="지역별 게시판"/>
            <h2>{region === 'daejeon' ? '대전' : region === 'sejong' ? '세종' : region === 'chungnam' ? '충남' : ''} 게시판</h2>

            <div className="post-list">
                {regionPosts.length > 0 ? (
                    regionPosts.map((post) => (
                        <div className="post-item" key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                            <h2 className="post-header">{post.title}</h2>
                            <p className="post-content">{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>게시글이 없습니다.</p>
                )}
            </div>

            {/* 글쓰기 버튼 */}
            <button className="write-button" onClick={() => navigate("/write")}>
                글쓰기 +
            </button>
        </div>
    );
}

export default RegionSpecificBoard;