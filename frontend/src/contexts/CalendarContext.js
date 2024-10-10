import React, { createContext, useState, useContext } from "react";

// 1. Context の作成
const CalendarContext = createContext();

// 2. Provider コンポーネント
export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

// // 3. カスタムフック (オプション)
// export const useCalendar = () => {
//   return useContext(CalendarContext);
// };
