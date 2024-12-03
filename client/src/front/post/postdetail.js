// 게시글 클릭할 때 볼 수 있는 (게시글 상세보기)
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./postdetail.css";
import userIcon from "../images/user.png";

const PostDetail = ({ posts, onSendMessage }) => {
    const { postId } = useParams();
    const post = posts.find((post) => post.id === Number(postId));
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [newReply, setNewReply] = useState("");
    const [anonymousMapping, setAnonymousMapping] = useState({});
    const [likes, setLikes] = useState(0);
    const [likedUsers, setLikedUsers] = useState(new Set());
    const [showPopup, setShowPopup] = useState(false);
    const [popupRecipient, setPopupRecipient] = useState("");
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        if (!anonymousMapping[postId]) {
            setAnonymousMapping((prev) => ({ ...prev, [postId]: {} }));
        }
    }, [postId, anonymousMapping]);

    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }

    const generateAnonymousName = () => {
        if (!anonymousMapping[postId][comments.length]) {
            const newAnonymousName = `익명${
                Object.keys(anonymousMapping[postId]).length + 1
            }`;
            setAnonymousMapping((prev) => ({
                ...prev,
                [postId]: { ...prev[postId], [comments.length]: newAnonymousName },
            }));
            return newAnonymousName;
        }
        return anonymousMapping[postId][comments.length];
    };

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            const comment = {
                id: uuidv4(),
                text: newComment,
                author: isAnonymous ? generateAnonymousName() : "작성자",
                isAnonymous,
                replies: [],
            };
            setComments([...comments, comment]);
            setNewComment("");
        }
    };

    const handleReply = (commentId) => {
        setReplyTo(commentId);
        setNewReply("");
    };

    const handleAddReply = () => {
        if (newReply.trim() !== "") {
            setComments(
                comments.map((comment) => {
                    if (comment.id === replyTo) {
                        return {
                            ...comment,
                            replies: [
                                ...comment.replies,
                                {
                                    id: uuidv4(),
                                    text: newReply,
                                    author: isAnonymous ? generateAnonymousName() : "작성자",
                                },
                            ],
                        };
                    }
                    return comment;
                })
            );
            setReplyTo(null);
        }
    };

    const handleLike = () => {
        const currentUser = "user123"; // 현재 사용자 식별값
        if (!likedUsers.has(currentUser)) {
            setLikes(likes + 1);
            setLikedUsers(new Set([...likedUsers, currentUser]));
        } else {
            alert("이미 추천하셨습니다!");
        }
    };

    const handleSendPopupMessage = () => {
        if (popupMessage.trim() !== "") {
            console.log(`쪽지 전송: ${popupMessage} 수신자: ${popupRecipient}`);
            setShowPopup(false);
            setPopupMessage("");
        }
    };

    const handlePopupOpen = (recipient) => {
        setPopupRecipient(recipient);
        setShowPopup(true);
    };

    return (
        <div className="post-detail-container">
            <div className="post-header">
                <div className="author-info">
                    <img src={userIcon} alt="프로필" className="profile-image" />
                    <div>
                        <span>{post.isAnonymous ? "익명" : post.author}</span>
                        <span className="post-date">{post.date}</span>
                    </div>
                </div>
                <button
                    className="send-message-button"
                    onClick={() => handlePopupOpen(post.author)}
                >
                    쪽지 보내기
                </button>
            </div>
            <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {post.image && (
                    <img src={post.image} alt="첨부 이미지" className="post-image" />
                )}
            </div>
            <div className="post-actions">
                <button className="like-button" onClick={handleLike}>
                    👍 {likes}
                </button>
            </div>
            <hr className="content-divider" />
            <div className="comments-section">
                <h3>댓글</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="comment-header">
                            <span>{comment.author}</span>
                            <div className="comment-buttons">
                                <button
                                    onClick={() => handleReply(comment.id)}
                                    className="reply-button"
                                >
                                    대댓글
                                </button>
                                <button
                                    onClick={() => handlePopupOpen(comment.author)}
                                    className="send-message-button"
                                >
                                    쪽지
                                </button>
                            </div>
                        </div>
                        <p>{comment.text}</p>
                        {comment.replies &&
                            comment.replies.map((reply) => (
                                <div key={reply.id} className="reply">
                                    <span>{reply.author}:</span> {reply.text}
                                </div>
                            ))}
                    </div>
                ))}
                {replyTo && (
                    <div className="add-reply">
            <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="대댓글을 입력하세요"
                maxLength={200}
            />
                        <button onClick={handleAddReply}>작성</button>
                    </div>
                )}
                <div className="add-comment">
          <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              maxLength={200}
          />
                    <div className="comment-actions">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={() => setIsAnonymous(!isAnonymous)}
                            />
                            익명
                        </label>
                        <button onClick={handleAddComment}>댓글 작성</button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h3>쪽지 보내기</h3>
                        <textarea
                            value={popupMessage}
                            onChange={(e) => setPopupMessage(e.target.value)}
                            placeholder="쪽지 내용을 입력하세요"
                            maxLength={300}
                        />
                        <div className="popup-actions">
                            <button onClick={handleSendPopupMessage} className="send-button">
                                보내기
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="close-button"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
