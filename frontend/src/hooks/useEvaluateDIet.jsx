"use client";
import React, { useMemo } from "react";
import useCalcDailyTotalCalories from "./useCalcDailyTotalCalories";

/**
 * Custom hook: useEvaluate Diet
 * @param {Object} inputData - 評価に必要なデータ
 * @returns {Object} 評価結果
 */

const useEvaluateDiet = (inputData, personalTarget) => {
    const dairyCalories = useCalcDailyTotalCalories(inputData);

    const evaluateCalories = () => {
        const scores = dairyCalories.map((dayCalories) => {
            const absDiff = Math.abs(parseFloat(dayCalories.totalCalories) - personalTarget.cal) / personalTarget.cal;
            console.log(Math.max(5 - absDiff * 10, 1));
            return Math.max(5 - absDiff * 10, 1);
        });
        return parseFloat((scores.reduce((a, b) => a + b, 0) / 7).toFixed(1));
    };

    const totalScore = useMemo(() => {
        const scores = {
            カロリー達成度: evaluateCalories()
        };

        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        let rank;
        if (total >= 21) rank = "S";
        else if (total >= 16) rank = "A";
        else if (total >= 11) rank = "B";
        else if (total >= 6) rank = "C";
        else rank = "D";
        return {...scores, total: parseFloat(total.toFixed(1)), rank};
    }, [inputData, personalTarget]);

    return totalScore;
};

export default useEvaluateDiet;