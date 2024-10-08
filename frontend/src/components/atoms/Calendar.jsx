import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "dayjs/locale/ja"
import dayjs from 'dayjs';

dayjs.locale("ja");

const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    onDateChange(newValue);  // 親コンポーネントに選択された日付を渡す
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="誕生日を選択してください"
        format="YYYY/MM/DD"
        slotProps={{ calendarHeader: { format: 'YYYY年MM月' } }}
        value={selectedDate}
        // onChange={(newValue) => setSelectedDate(newValue)}
        onChange={handleDateChange}
        textField={(params) => <input {...params} />}
        maxDate={dayjs()}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
