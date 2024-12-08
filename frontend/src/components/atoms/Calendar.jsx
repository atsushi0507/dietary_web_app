import React, { useState, useEffect, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

// 日本語ロケールを登録
registerLocale("ja", ja);

const Calendar = ({ initialDate, onDateChange, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : null);
  const calendarRef = useRef(null);

  // 日付変更ハンドラー
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    const formattedDate = dayjs(newValue).format("YYYY/MM/DD");
    onDateChange(formattedDate);
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
    <div ref={calendarRef}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="yyyy/MM/dd" // 表示形式
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        maxDate={new Date()}
        locale="ja"
      />
    </div>
  );
};

export default Calendar;
