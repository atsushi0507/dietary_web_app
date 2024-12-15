import useCalcTodaysNutrition from "@/hooks/useMealData";
import useCalcSelectedDateNutrition from "@/hooks/useCalcSelectedDateNutrition";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";

const mealTypes = [
    { label: "朝食", type: "朝食" },
    { label: "昼食", type: "昼食" },
    { label: "夕食", type: "夕食" },
    { label: "間食", type: "間食" },
];

const MealRecordDisplay = ({ date }) => {
    const [mealRecord, setMealRecord] = useState([]);
    
    // 現在の食事データを取得するフック
    const mealData = useCalcSelectedDateNutrition(date);

    // dateが変わるたびにmealRecordを更新
    useEffect(() => {
        if (mealData) {
            setMealRecord(mealData);
        }
    }, [date, mealData]); // `date` または `mealData` が変わったら更新

    return (
        <div>
            {mealTypes.map(({ label, type }) => {
                const meal = mealRecord.find((data) => data.meal_type === type);

                return (
                    <div key={type}>
                        {/* 食事タイプを表示 */}
                        <Typography variant="h6">{label}</Typography>

                        {/* 食事データの有無を確認 */}
                        {meal && meal.nutrition.length > 0 ? (
                            <>
                                {/* メニュー名の一覧 */}
                                <Typography variant="body1">
                                    メニュー: {meal.nutrition.map((item) => item.menu).join(", ")}
                                </Typography>

                                {/* 合計カロリー */}
                                <Typography variant="body1" color="textSecondary">
                                    合計カロリー: {meal.nutrition.reduce((total, item) => total + parseFloat(item.calories), 0)} kcal
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body1" color="textSecondary">
                                記録なし
                            </Typography>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MealRecordDisplay;

const MenuContainer = styled.div`
    display: flex;
`;
