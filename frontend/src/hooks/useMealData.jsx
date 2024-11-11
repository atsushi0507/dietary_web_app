"use client";

import React, { useEffect, useState } from "react";
import sampleDB from "@/public/sampleDB.json";

const useCalcNutrition = () => {
    const [nutritionData, setNutritionData] = useState([]); // 初期値は空の配列

    const today = new Date(2024, 10, 12).toISOString().split("T")[0]; // For the development of this function, to be deleted after development.

    // ローカルストレージからデータを取得し、栄養データを計算する関数
    const calculateNutrition = () => {
        if (typeof window !== "undefined") {
            const storedData = JSON.parse(localStorage.getItem("todaysMealRecord"));
            if (!storedData || !storedData.meals) { 
                console.log("Null!");
                return []; // データがない場合は空の配列を返す
            }

            // const mealRecords = storedData[today];
            const mealRecords = storedData.meals;
            
            return mealRecords.map((record) => {
                const mealDetails = record.menus;
                const nutritionSummary = Object.entries(mealDetails).map(([menuName, volume]) => {
                    const itemData = sampleDB.find(item => item.menu === menuName);
                    if (!itemData) return null;

                    return {
                        menu: menuName,
                        calories: (itemData.cal * volume * (itemData.volume / 100)).toFixed(1),
                        protein: (itemData.protein * volume * (itemData.volume / 100)).toFixed(1),
                        fat: (itemData.fat * volume * (itemData.volume / 100)).toFixed(1),
                        carb: (itemData.carb * volume * (itemData.volume / 100)).toFixed(1)
                    };
                }).filter(item => item !== null);
                
                return {
                    meal_type: record.meal_type,
                    nutrition: nutritionSummary
                };
            });
        }
        return []; // サーバーサイドの場合は空の配列を返す
    };

    // 初回レンダリング時に calculateNutrition を実行し、データを設定
    useEffect(() => {
        setNutritionData(calculateNutrition());
    }, []); // 初回レンダリング時のみ実行

    return nutritionData;
};

export default useCalcNutrition;
