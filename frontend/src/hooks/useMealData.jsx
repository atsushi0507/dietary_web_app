"use client";
import React, { useEffect, useState } from "react";
import sampleDB from "@/public/sampleDB.json";

const useCalcTodaysNutrition = () => {
    const [nutritionData, setNutritionData] = useState([]);

    const today = new Date().toISOString().split("T")[0];

    const calculateNutrition = () => {
        if (typeof window !== "undefined") {
            const storedData = JSON.parse(localStorage.getItem("mealRecord"));
            if (!storedData || !storedData[today]) { 
                console.log("No data for today!");
                return [];
            }

            const mealRecords = storedData[today];

            const nutritionResults = Object.entries(mealRecords).map(([mealType, menus]) => {
                const nutritionSummary = Object.entries(menus).map(([menuName, volume]) => {
                    const itemData = sampleDB.find(item => item.menu === menuName);
                    if (!itemData) return null; // メニューが見つからない場合はスキップ

                    return {
                        menu: menuName,
                        calories: (itemData.cal * volume * (itemData.volume / 100)).toFixed(1),
                        protein: (itemData.protein * volume * (itemData.volume / 100)).toFixed(1),
                        fat: (itemData.fat * volume * (itemData.volume / 100)).toFixed(1),
                        carb: (itemData.carb * volume * (itemData.volume / 100)).toFixed(1),
                    };
                }).filter(item => item !== null); // null のエントリを除外

                return {
                    meal_type: mealType,
                    nutrition: nutritionSummary
                };
            });

            return nutritionResults;
        }
        return [];
    };

    useEffect(() => {
        setNutritionData(calculateNutrition());
    }, []); // 初回レンダリング時のみ実行

    return nutritionData;
};

export default useCalcTodaysNutrition;
