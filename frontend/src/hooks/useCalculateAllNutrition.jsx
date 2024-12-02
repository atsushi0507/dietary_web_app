"use client";
import { useState, useEffect } from "react";
import sampleDB from "@/public/sampleDB.json";

const useCalculateAllNutrition = () => {
    const [allNutritionData, setAllNutritionData] = useState([]);

    const calculateAllNutrition = () => {
        if (typeof window !== "undefined") {
            const storedData = JSON.parse(localStorage.getItem("mealRecord"));
            if (!storedData) {
                console.log("No data available!");
                return [];
            }

            const allNutrition = Object.entries(storedData).map(([date, dayRecord]) => {
                let totalCalories = 0;
                const pfc = { protein: 0, fat: 0, carb: 0 };

                Object.entries(dayRecord).forEach(([mealType, menus]) => {
                    Object.entries(menus).forEach(([menuName, volume]) => {
                        const itemData = sampleDB.find((item) => item.menu === menuName);
                        if (!itemData) return;

                        const mealCalories = itemData.cal * volume * (itemData.volume / 100);
                        totalCalories += mealCalories;
                        pfc.protein += itemData.protein * volume * (itemData.volume / 100);
                        pfc.fat += itemData.fat * volume * (itemData.volume / 100);
                        pfc.carb += itemData.carb * volume * (itemData.volume / 100);
                    });
                });

                return {
                    date,
                    calories: parseFloat(totalCalories.toFixed(1)),
                    protein: parseFloat(pfc.protein.toFixed(1)),
                    fat: parseFloat(pfc.fat.toFixed(1)),
                    carb: parseFloat(pfc.carb.toFixed(1))
                };
            });

            return allNutrition;
        }
        return [];
    };

    useEffect(() => {
        setAllNutritionData(calculateAllNutrition());
    }, []);

    return allNutritionData;
};

export default useCalculateAllNutrition;
