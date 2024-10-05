import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "dayjs/locale/ja"
import dayjs from 'dayjs';

dayjs.locale("ja");

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="誕生日を選択してください"
        format="YYYY/MM/DD"
        slotProps={{ calendarHeader: { format: 'YYYY年MM月' } }}
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        textField={(params) => <input {...params} />}
        maxDate={dayjs()}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
