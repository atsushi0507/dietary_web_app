"use client";
import React, { useMemo } from "react";
import useCalcDailyTotalCalories from "./useCalcDailyTotalCalories";

const useEvaluateDiet = (inputData, personalTarget) => {
    const dairyCalories = useCalcDailyTotalCalories(inputData);
    const pfcs = inputData.map((day) => ({
        date: day.date,
        protein: day.pfc.protein,
        fat: day.pfc.fat,
        carb: day.pfc.carb
    }));
    const mealCounts = inputData.map((day) => ({
        date: day.date,
        count: day.meals
    }));
    const balances = inputData.map((day) => ({
        date: day.date,
        balance: day.balance
    }));

    const evaluateCalories = () => {
        const scores = dairyCalories.map((dayCalories) => {
            const absDiff = Math.abs(parseFloat(dayCalories.totalCalories) - personalTarget.cal) / personalTarget.cal;
            return Math.max(5 - absDiff * 10, 0); // 線形の減点係数では、目安に近いときでも小さな差分が同じウェイトで減点されてしまう
        });
        return parseFloat((scores.reduce((a, b) => a + b, 0) / 7).toFixed(1));
    };

    const evaluateCalorieDeviation = () => {
        const calories = dairyCalories.map((day) => parseFloat(day.totalCalories));
        const mean = calories.reduce((a, b) => a + b, 0) / 7;
        const deviation = (mean - personalTarget.cal) / personalTarget.cal;
        return {
            average: parseFloat(mean.toFixed(1)),
            deviation: parseFloat((deviation * 100).toFixed(1)),
            high_low: deviation > 0 ? "+" : "-"
        };
    };

    const evaluatePFC = () => {
        const scores = pfcs.map((pfc) => {
            const p = parseFloat(pfc.protein);
            const f = parseFloat(pfc.fat);
            const c = parseFloat(pfc.carb);
            const deviation = 
            Math.sqrt(((p - personalTarget.P) / personalTarget.P)**2 +
            ((f - personalTarget.F) / personalTarget.F)**2 +
            ((c - personalTarget.C) / personalTarget.C)**2) / 3;
            return Math.max(5 - deviation * 10, 0); // 減点係数: 0.05
        });
        return parseFloat((scores.reduce((a, b) => a + b, 0) / 7).toFixed(1));
    };

    const getPFCDeviationDetails = () => {
        const protein = [];
        const fat = [];
        const carb = [];
        pfcs.map((pfc) => {
            protein.push(parseFloat(pfc.protein));
            fat.push(parseFloat(pfc.fat));
            carb.push(parseFloat(pfc.carb));
        })
        const pMean = protein.reduce((a, b) => a + b, 0) / 7;
        const fMean = fat.reduce((a, b) => a + b, 0) / 7;
        const cMean = carb.reduce((a, b) => a + b, 0) / 7;

        const pDiff = (pMean - personalTarget.P) / personalTarget.P;
        const fDiff = (fMean - personalTarget.F) / personalTarget.F;
        const cDiff = (cMean - personalTarget.C) / personalTarget.C;

        const deviations = [
            {type: "protein", diff: pDiff},
            {type: "fat", diff: fDiff},
            {type: "carb", diff: cDiff}
        ];

        const maxDeviation = deviations.reduce((max, current) => 
            Math.abs(current.diff) > Math.abs(max.diff) ? current : max
        );

        return {
            type: maxDeviation.type,
            value: (maxDeviation.diff*100).toFixed(1),
            high_low: maxDeviation.diff > 0 ? "+" : "-"
        };

    }

    const evaluateCount = () => {
        const scores = mealCounts.map((mealCount) => {
            if (mealCount.count === 3) return 5;
            else if (mealCount.count === 2) return 3.5;
            else if (mealCount.count === 1) return 2;
            return 0;
        });
        return parseFloat((scores.reduce((a, b) => a + b, 0) / 7).toFixed(1));
    };

    const evaluateMealBalancee = () => {
        const idealBreakfast = personalTarget.cal * 0.3;
        const idealLunch = personalTarget.cal * 0.4;
        const idealDinner = personalTarget.cal * 0.3;
        const scores = balances.map((balance) => {
            const breakfast = parseFloat(balance.balance.朝食);
            const lunch = parseFloat(balance.balance.昼食);
            const dinner = parseFloat(balance.balance.夕食);
            const deviation = 
            Math.sqrt(
                ((breakfast - idealBreakfast) / idealBreakfast)**2 +
                ((lunch - idealLunch) / idealLunch)**2 +
                ((dinner - idealDinner) / idealDinner)**2
            ) / 3;
            // const score = 5 * Math.exp(-deviation * 5);
            const score = Math.max(5 - deviation * 10, 0);
            return parseFloat(score.toFixed(1));
        });
        return parseFloat((scores.reduce((a, b) => a + b, 0) / 7).toFixed(1));
    };

    const getCalorieBalanceDeviationDetails = () => {
        const deviations = balances.map((balance) => {
            const breakfast = parseFloat(balance.balance.朝食);
            const lunch = parseFloat(balance.balance.昼食);
            const dinner = parseFloat(balance.balance.夕食);
    
            const idealBreakfast = personalTarget.cal * 0.3;
            const idealLunch = personalTarget.cal * 0.4;
            const idealDinner = personalTarget.cal * 0.3;
    
            return {
                朝食: (breakfast - idealBreakfast) / idealBreakfast,
                昼食: (lunch - idealLunch) / idealLunch,
                夕食: (dinner - idealDinner) / idealDinner,
            };
        });
    
        const summedDeviations = deviations.reduce(
            (total, current) => {
                total.朝食 += Math.abs(current.朝食);
                total.昼食 += Math.abs(current.昼食);
                total.夕食 += Math.abs(current.夕食);
                return total;
            },
            { 朝食: 0, 昼食: 0, 夕食: 0 }
        );
    
        const averageDeviations = {
            朝食: summedDeviations.朝食 / 7,
            昼食: summedDeviations.昼食 / 7,
            夕食: summedDeviations.夕食 / 7,
        };
    
        const maxDeviation = Object.entries(averageDeviations).reduce(
            (max, current) =>
                Math.abs(current[1]) > Math.abs(max.value)
                    ? { type: current[0], value: current[1] }
                    : max,
            { type: "", value: 0 }
        );
    
        return {
            type: maxDeviation.type,
            value: (maxDeviation.value * 100).toFixed(1),
            high_low: maxDeviation.value > 0 ? "+" : "-",
        };
    };   

    const evaluateStability = () => {
        const calories = [];
        dairyCalories.map((dayCalories) => {
            calories.push(parseFloat(dayCalories.totalCalories));
        });
        const mean = calories.reduce((a, b) => a + b, 0) / 7;
        const variance = calories.reduce((sum, cal) => sum + (cal - mean) ** 2, 0) / 7;
        const sigma = Math.sqrt(variance);
        return Math.max(5 - sigma * 0.01, 0); // 減点係数: 0.1 (100 kcalで1点減点)
    }

    const totalScore = useMemo(() => {
        const scores = {
            カロリー達成度: evaluateCalories(),
            PFCバランス: evaluatePFC(),
            // 食事回数: evaluateCount(),
            食事バランス: evaluateMealBalancee(),
            // 安定性: evaluateStability()
        };

        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        let rank;
        if (total >= 12) rank = "S";
        else if (total >= 9) rank = "A";
        else if (total >= 6) rank = "B";
        else if (total >= 3) rank = "C";
        else rank = "D";
        return {...scores,
            total: parseFloat(total.toFixed(1)),
            rank,
            deviation: getPFCDeviationDetails(),
            calorieDeviation: evaluateCalorieDeviation(),
            calorieBalanceDeviation: getCalorieBalanceDeviationDetails()
        };
    }, [inputData, personalTarget]);

    return totalScore;
};

export default useEvaluateDiet;