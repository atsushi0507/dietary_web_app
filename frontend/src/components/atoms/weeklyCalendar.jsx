import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ヘルパー関数: 一週間分の日付を取得
const getWeekDays = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay()); // 日曜日を週の始まりとする
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
};

const WeeklyCalendar = ({ initialDate, onDateChange, onClose }) => {
  const [currentWeek, setCurrentWeek] = useState(getWeekDays(new Date(initialDate || new Date())));
  const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : null);
  const calendarRef = useRef(null);

  // 前の週へ移動
  const handlePreviousWeek = () => {
    const newStartDate = new Date(currentWeek[0]);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeek(getWeekDays(newStartDate));
  };

  // 次の週へ移動
  const handleNextWeek = () => {
    const newStartDate = new Date(currentWeek[0]);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setCurrentWeek(getWeekDays(newStartDate));
  };

  // 日付を選択
  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(dayjs(date).format("YYYY/MM/DD"));
    }
    if (onClose) {
      onClose();
    }
  };

  // カレンダー外クリックで閉じる
  useEffect(() => {
    if (!onClose) return;

    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        if (onClose) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={calendarRef} style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
        <button
          onClick={handlePreviousWeek}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#007bff",
          }}
        >
          <FaChevronLeft />
        </button>
        <span style={{ margin: "0 20px", fontSize: "18px" }}>
          {dayjs(currentWeek[0]).format("YYYY/MM/DD")} - {dayjs(currentWeek[6]).format("YYYY/MM/DD")}
        </span>
        <button
          onClick={handleNextWeek}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#007bff",
          }}
        >
          <FaChevronRight />
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
        {currentWeek.map((day) => (
          <div
            key={day.toDateString()}
            onClick={() => handleDateClick(day)}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor:
                selectedDate?.toDateString() === day.toDateString() ? "#007bff" : "#fff",
              color: selectedDate?.toDateString() === day.toDateString() ? "#fff" : "#000",
              width: "80px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <div>{dayjs(day).format("DD")}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {dayjs(day).format("ddd")} {/* 曜日表示 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
