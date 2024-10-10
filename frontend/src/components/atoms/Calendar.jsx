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

// import React, { useState } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import "dayjs/locale/ja"
// import dayjs from 'dayjs';

// dayjs.locale("ja");

// const Calendar = ({ onDateChange }) => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   const handleDateChange = (newValue) => {
//     setSelectedDate(newValue);
//     onDateChange(newValue);  // 親コンポーネントに選択された日付を渡す
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         label="日付を選択"
//         format="YYYY/MM/DD"
//         slotProps={{ calendarHeader: { format: 'YYYY年MM月' } }}
//         value={selectedDate}
//         onChange={handleDateChange}
//         textField={(params) => <input {...params} />}
//         maxDate={dayjs()}
//         open={true}
//       />
//     </LocalizationProvider>
//   );
// };

// export default Calendar;
