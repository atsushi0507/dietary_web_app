"use client";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// 年齢を計算する関数
const calculateAge = (birthday) => {
  const birth = dayjs(birthday, 'YYYY/MM/DD');
  const today = dayjs();
  return today.diff(birth, 'year');
};

// 活動レベルに基づく係数を返す関数
const getActivityMultiplier = (activityLevel) => {
  switch (activityLevel) {
    case "ほぼ運動をしない":
      return 1.2;
    case "軽い運動(週に1-2回程)":
      return 1.375;
    case "中程度の運動(週に3-5回程)":
      return 1.55;
    case "激しい運動やスポーツ(週に6-7回程)":
      return 1.725;
    case "非常に激しい運動、肉体労働(一日に2回運動)":
      return 1.9;
    default:
      return 1.2; // デフォルトはほぼ運動をしない
  }
};

// 目標に基づく係数を返す関数
const getGoalMultiplier = (goal) => {
  switch (goal) {
    case "減量 (ハードモード)":
      return 0.8;
    case "減量 (ノーマルモード)":
      return 0.9;
    case "現状維持":
      return 1.0;
    case "増量":
      return 1.1;
    default:
      return 1.0; // デフォルトは維持
  }
};

// ミフリン・セントジョール方程式を使ってカロリーとPFCを計算するフック
const useCalorieAndPFC = (initialValues) => {
  const { gender, birthday, height, weight, activityLevel, goal } = initialValues;
  const numericHeight = Number(height);
  const numericWeight = Number(weight);
  
  const [calories, setCalories] = useState(null);
  const [PFC, setPFC] = useState({ protein: 0, fat: 0, carbs: 0 });

  useEffect(() => {
    // 年齢を計算
    const age = calculateAge(birthday);

    // BMRの計算
    let BMR;
    if (gender === "男性") {
      BMR = 10 * numericWeight + 6.25 * numericHeight - 5 * age + 5;
    } else if (gender === "女性") {
      BMR = 10 * numericWeight + 6.25 * numericHeight - 5 * age - 161;
    } else {
      const mens_bmr = 10 * numericWeight + 6.25 * numericHeight - 5 * age + 5;
      const womens_bmr = 10 * numericWeight + 6.25 * numericHeight - 5 * age - 161;
      BMR = (mens_bmr + womens_bmr) * 0.5;
    }

    // 活動レベルによる係数
    const activityMultiplier = getActivityMultiplier(activityLevel);

    // TDEEの計算
    const TDEE = BMR * activityMultiplier;

    // 目標に基づく摂取カロリーの計算
    const goalMultiplier = getGoalMultiplier(goal);
    const targetCalories = TDEE * goalMultiplier;

    // PFCバランスの計算
    const proteinIntake = (targetCalories * 0.15) / 4; // タンパク質は1gあたり4kcal
    const fatIntake = (targetCalories * 0.25) / 9;    // 脂質は1gあたり9kcal
    const carbsIntake = (targetCalories * 0.60) / 4;  // 炭水化物は1gあたり4kcal

    // ステートに結果をセット
    setCalories(Math.round(targetCalories*10)/10);
    setPFC({
      protein: Math.round(proteinIntake*10) / 10,
      fat: Math.round(fatIntake*10) / 10,
      carbs: Math.round(carbsIntake*10) / 10,
    });
  }, [gender, birthday, height, weight, activityLevel, goal]);

  return { calorieIntake: calories, ...PFC };
};

export default useCalorieAndPFC;
