import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar_page.css';  // CSS 파일 추가

const CalendarPage = () => {
    const navigate = useNavigate(); // navigate 함수 사용
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState({});  // 날짜별 할 일 저장
    const [taskInput, setTaskInput] = useState('');
    const [showModal, setShowModal] = useState(false);

    // 홈 버튼 클릭 시
    const event_home_btn = () => {
        navigate('/'); // 홈 페이지로 이동
    };

    // 현재 월의 날짜들 가져오기
    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 0);
        return Array.from({ length: date.getDate() }, (_, i) => i + 1);
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

    // 날짜 클릭 시 할 일 추가
    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
        setShowModal(true);  // 날짜 클릭 시 모달 띄우기
    };

    // 할 일 입력 처리
    const handleTaskInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    // 할 일 추가
    const handleAddTask = () => {
        if (taskInput.trim() !== '') {
            const dateKey = selectedDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 저장
            const updatedTasks = { ...tasks };
            if (!updatedTasks[dateKey]) {
                updatedTasks[dateKey] = [];
            }
            // 새로운 할 일 객체 추가 (text, completed)
            updatedTasks[dateKey].push({ text: taskInput, completed: false });
            setTasks(updatedTasks);
            setTaskInput('');
            setShowModal(false); // 할 일 추가 후 모달 닫기
        }
    };

    // 체크박스 클릭 시 완료 상태 변경
    const toggleTaskCompletion = (dateKey, index) => {
        const updatedTasks = { ...tasks };
        updatedTasks[dateKey][index].completed = !updatedTasks[dateKey][index].completed; // 완료 상태 반전
        setTasks(updatedTasks);
    };

    // 날짜에 추가된 할 일 표시 (체크박스와 텍스트)
    const renderTasksForDay = (day) => {
        const dateKey = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
        if (tasks[dateKey]) {
            return tasks[dateKey].map((task, index) => (
                <div
                    key={index}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                    onClick={() => toggleTaskCompletion(dateKey, index)} // 클릭 시 완료 상태 변경
                >
                    <span className={`task-icon ${task.completed ? 'completed' : ''}`}></span>
                    <span className="task-text">{task.text}</span>
                </div>
            ));
        }
        return null;
    };

    // 날짜 클릭 시 모달 띄우기
    const renderModal = () => {
        if (!showModal || !selectedDate) return null;
        return (
            <div className="modal">
                <div className="modal-content">
                    <h2>{selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</h2>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={handleTaskInputChange}
                        placeholder="할 일을 입력하세요"
                        className="task-input"
                    />
                    <button onClick={handleAddTask} className="add-task-button">추가</button>
                    <button onClick={() => setShowModal(false)} className="close-modal-button">닫기</button>
                </div>
            </div>
        );
    };

    // 요일 표시
    const renderDayNames = () => {
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return dayNames.map((dayName, index) => (
            <div key={index} className="calendar-day-name">
                {dayName}
            </div>
        ));
    };

    return (
        <div className="calendar-page">
            <h1>캘린더 페이지</h1>

            {/* 홈 버튼 */}
            <button onClick={event_home_btn} className={"event_home_btn"}>
                홈으로 이동
            </button>

            {/* 달력 네비게이션 */}
            <div className="calendar-nav">
                <button className="nav-button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>이전</button>
                <h2>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h2>
                <button className="nav-button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>다음</button>
            </div>

            {/* 요일 표시 */}
            <div className="calendar-header">
                {renderDayNames()}
            </div>

            {/* 달력 그리드 */}
            <div className="calendar-grid">
                {daysInMonth.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''} ${currentDate.getDate() === day ? 'today' : ''}`}
                        onClick={() => handleDateClick(day)}
                    >
                        {day}
                        {renderTasksForDay(day)}  {/* 해당 날짜에 할 일 표시 */}
                    </div>
                ))}
            </div>

            {/* 할 일 모달 */}
            {renderModal()}
        </div>
    );
};

export default CalendarPage;
