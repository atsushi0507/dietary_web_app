import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/atoms/Calendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

// LocalizationProvider のラッパーを提供するためのヘルパー
const renderWithProviders = (ui) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {ui}
    </LocalizationProvider>
  );
};

describe('Calendar Component', () => {
  test('renders DatePicker with correct label', () => {
    renderWithProviders(<Calendar />);
    // カレンダーラベルが正しく表示されるか
    expect(screen.getByLabelText(/誕生日を選択してください/i)).toBeInTheDocument();
  });

  test.skip('allows date selection', () => {
    renderWithProviders(<Calendar />);
    const input = screen.getByLabelText(/誕生日を選択してください/i);

    // フォーカスを当てるとカレンダーが表示されることを確認
    fireEvent.click(input);

    // カレンダーの "15" を含む要素を探す (カレンダーが開かれている状態で)
    const dayToSelect = screen.getAllByRole('button', { name: /15/ })[0];
    expect(dayToSelect).toBeInTheDocument(); // 日付が表示されていることを確認
    fireEvent.click(dayToSelect); // 日付を選択

    // 選択した日付が正しく反映されているか確認
    expect(input).toHaveValue(dayjs().date(15).format('YYYY/MM/DD'));
  });

  test('restricts selection to dates on or before today', () => {
    renderWithProviders(<Calendar />);
    const input = screen.getByLabelText(/誕生日を選択してください/i);

    fireEvent.click(input);

    const tomorrow = dayjs().add(1, 'day').format('D'); // 翌日の日付

    // 翌日の日付が選べないことを確認
    const tomorrowButton = screen.queryByText(tomorrow);
    expect(tomorrowButton).not.toBeInTheDocument();
  });
});
