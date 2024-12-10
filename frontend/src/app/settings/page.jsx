"use client";

import React, { useState, useEffect } from "react";
import questions from "@/public/setting_questions.json";
import { Box, Typography, Select, MenuItem, Button as MuiButton} from "@mui/material";
import Calendar from "@/components/atoms/Calendar"; // 自作コンポーネント
import styled from "styled-components";
import Button from "@/components/atoms/Button";
import useCalorieAndPFC from "@/hooks/useCalorieAndPFC";

const Settings = () => {
    const [userInfo, setUserInfo] = useState({});
    const [editDate, setEditDate] = useState(false); // 誕生日の編集フラグ

    // ローカルストレージからデータを取得
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
        setUserInfo(storedUserData);
    }, []);

    // ユーザー情報を更新
    const handleChange = (id, value) => {
        const updatedInfo = { ...userInfo, [id]: value };
        setUserInfo(updatedInfo);
    };

    const { calorieIntake, protein, fat, carbs } = useCalorieAndPFC(userInfo);

    const handleSave = () => {
        const updatedUserInfo = { ...userInfo, cal: calorieIntake, protein: protein, fat: fat, carb: carbs };
        localStorage.setItem("userData", JSON.stringify(updatedUserInfo));
    }

    return (
        <>
            {questions.map((question) => (
                <Box key={question.id} sx={{ display: "flex", alignItems: "center", marginLeft: "8px", marginBottom: "16px", marginRight: "8px", idth: "100%" }}>
                    <Typography sx={{ flex: 1 }}>{question.confirm}:</Typography>
                    
                    {/* 動的レンダリング */}
                    {question.type === "number" ? (
                        <Wrapper>
                            <NumberInput
                                type="number"
                                value={userInfo[question.id] || ""}
                                onChange={(e) => handleChange(question.id, parseFloat(e.target.value))}
                                min={question.minValue}
                                max={question.maxValue}
                                step={0.1}
                                sx={{ width: "200px" }}  // NumberInput の幅を指定
                            />
                            <Typography sx={{ fontSize: "1rem", marginLeft: "4px" }}>
                                {question.unit}
                            </Typography>
                        </Wrapper>
                    ) : question.type === "radio" ? (
                        <Select
                            value={userInfo[question.id] || ""}
                            onChange={(e) => handleChange(question.id, e.target.value)}
                            displayEmpty
                            sx={{ flex: 2 }}
                        >
                            {question.options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : question.type === "date" ? (
                        editDate ? (
                            <Calendar
                                initialDate={userInfo[question.id]} // デフォルト値としてuserInfoの日付を渡す
                                onDateChange={(date) => {
                                    handleChange(question.id, date); // 日付を更新
                                }}
                                onClose={() => setEditDate(false)} // カレンダー外クリック時に閉じる
                            />
                        ) : (
                            <MuiButton onClick={() => setEditDate(true)}>
                                {userInfo[question.id] || "編集する"}
                            </MuiButton>
                        )
                    ) : null}
                </Box>
            ))}
            <ButtonArray>
                <Button onClick={handleSave}>保存</Button>
            </ButtonArray>
        </>
    );
};

export default Settings;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: auto; // 必要に応じて調整可能
  margin-left: auto;  // 左側を自動調整して右に寄せる
  padding-right: 16px;  // 右端に余白を追加
`;

const NumberInput = styled.input`
  width: 100%;
  max-width: 250px;  // 最大幅を設定
  box-sizing: border-box;  // パディングとボーダーを含めた幅
  padding: 8px;
  font-size: 1rem;
`;

const ButtonArray = styled.div`
    position: fixed;
    bottom: 20px;
    right: 0;
    display: flex;
    padding: 0 16px;
    margin-right: 8px;
`