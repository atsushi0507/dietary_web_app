"use client";
import { useState, useEffect } from "react";

const useMealCount = () => {
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        const calculateHeatmapData = () => {
            if (typeof window === "undefined") return [];

            // ローカルストレージからデータを取得
            const storedData = JSON.parse(localStorage.getItem("mealRecord"));
            if (!storedData) {
                console.log("No meal data found in localStorage.");
                return [];
            }

            // 各日付の食事回数を集計
            const data = Object.entries(storedData).map(([date, meals]) => {
                const validMeals = Object.entries(meals).filter(([mealType, menus]) => {
                    // 無効なデータを排除
                    if (!menus || Object.keys(menus).length === 0) return false; // 空オブジェクト
                    if (Object.values(menus).includes("食べなかった")) return false; // "食べなかった" を含む場合
                    return true; // 有効なデータ
                });

                return [date, validMeals.length]; // 有効な食事タイプの数をカウント
            });

            return data;
        };

        setHeatmapData(calculateHeatmapData());
    }, []);

    return heatmapData;
};

export default useMealCount;
