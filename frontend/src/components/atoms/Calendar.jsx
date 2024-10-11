import dayjs from "dayjs";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import ja from 'date-fns/locale/ja'; // 日本語ロケールをインポート

// 日本語ロケールを登録
registerLocale('ja', ja);

const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    const formattedDate = dayjs(newValue).format("YYYY/MM/DD");
    onDateChange(formattedDate);
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      inline
      dateFormat="yyyy/MM/dd" // 表示形式を設定
      showYearDropdown // 年選択ドロップダウンを表示
      yearDropdownItemNumber={100} // 表示する年の数を設定
      scrollableYearDropdown
      maxDate={new Date()}
      locale="ja"
    />
  );
};

export default Calendar;
