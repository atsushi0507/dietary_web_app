"use client";
import React from "react";

const useCalcDailyTotalCalories = (mealData) => {
    // 日ごとの総摂取カロリーを計算
    const dailyCalories = mealData.map((day) => ({
        date: day.date,
        totalCalories: day.totalCalories,
    }));

    return dailyCalories;
};

export default useCalcDailyTotalCalories;
