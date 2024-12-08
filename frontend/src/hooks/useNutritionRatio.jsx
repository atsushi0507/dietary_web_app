"use client";
import { useState, useEffect } from "react";
import useCalculateAllNutrition from "@/hooks/useCalculateAllNutrition";

const useNutritionRatio = () => {
    const [weeklyData, setWeeklyData] = useState([]);
    const allNutritionData = useCalculateAllNutrition();

    // ローカルストレージから目標摂取量 (userData) を取得
    const getUserData = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        return userData || {
            cal: 2000,
            protein: 100,
            fat: 70,
            carb: 250,
        }; // デフォルト値
    };

    // 過去7日間の日付を取得
    const getPastSevenDays = () => {
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date(new Date().getTime() + 9 * 60 * 60 * 1000) // UTC+9に変換
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split("T")[0]);
        }
        return dates;
    };

    // 目標摂取量と実際の摂取量の比率を計算
    const calculateWeeklyNutrition = () => {
        if (!allNutritionData || allNutritionData.length === 0) return [];

        const userData = getUserData();
        const pastSevenDays = getPastSevenDays();

        const weeklyNutrition = pastSevenDays.map((date) => {
            const dayData = allNutritionData.find((entry) => entry.date === date);
            if (!dayData) {
                return {
                    date,
                    calories: 0,
                    protein: 0,
                    fat: 0,
                    carb: 0,
                };
            }

            // 摂取量と目標摂取量の比率を計算（百分率）
            const calories = parseFloat(((dayData.calories / userData.cal) * 100).toFixed(1));
            const protein = parseFloat(((dayData.protein / userData.protein) * 100).toFixed(1));
            const fat = parseFloat(((dayData.fat / userData.fat) * 100).toFixed(1));
            const carb = parseFloat(((dayData.carb / userData.carb) * 100).toFixed(1));

            return {
                date,
                calories,
                protein,
                fat,
                carb,
            };
        });

        // 日付順に並び替え（古い順）
        return weeklyNutrition.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    useEffect(() => {
        setWeeklyData(calculateWeeklyNutrition());
    }, [allNutritionData]);

    return weeklyData;
};

export default useNutritionRatio;
