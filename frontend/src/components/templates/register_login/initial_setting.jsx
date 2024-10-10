"use client";
import ProgressBar from "@/components/atoms/ProgressBar";
import React, { useState } from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title";
import NumberInput from "@/components/atoms/NumberInput";
import Calendar from "@/components/atoms/Calendar";
import RadioButton from "@/components/atoms/RadioButton";
import Button from "@/components/atoms/Button";
import BasicAlert from "@/components/atoms/Alert";
import dayjs from "dayjs";

const InitialSetting = ({ questions, answers, onNext, onAnswersUpdate}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange = (id, value) => {
        const newAnswers = { ...answers, [id]: value };
        onAnswersUpdate(newAnswers);
      };

    const handleDateChange = (newDate) => {
        // const formattedDate = newDate ? newDate.format("YYYY/MM/DD") : null; // 日付をフォーマットする
        // handleAnswerChange(currentQuestion.id, formattedDate); // フォーマットした日付を保存
        handleAnswerChange(currentQuestion.id, newDate);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onNext();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const renderAnswerInput = () => {
        switch (currentQuestion.type) {
        case "number":
            return (
            <div>
                <NumberInput
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    min={currentQuestion.minValue}
                    max={currentQuestion.maxValue}
                    step={0.1}
                />
                <span>{currentQuestion.unit}</span>
            </div>
            );
        case "date":
            return (
            <Calendar
                value={answers[currentQuestion.id] ? dayjs(answers[currentQuestion.id]) : null} // 既存の回答がある場合は dayjs オブジェクトに変換
                onDateChange={handleDateChange}
            />
            );
        case "radio":
            return currentQuestion.options.map((option) => (
            <RadioButton
                key={option}
                name={currentQuestion.id}
                value={option}
                checked={answers[currentQuestion.id] === option}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            />
            ));
        default:
            return null;
        }
    };

    return (
        <>
            <ProgressBar value={currentQuestionIndex + 1} maxValue={questions.length} isPercent={false}/>
            <Title level={2}>
                {currentQuestion.label}
            </Title>
            
            {/* 回答エリア */}
            {renderAnswerInput()}

            {currentQuestion.info !== null &&
                <BasicAlert severity="info" message={currentQuestion.info} />
            }

            <FootButton>
                <Button onClick={handlePrevious} disable={currentQuestionIndex === 0}>
                    戻る
                </Button>
                <Button onClick={handleNext}>
                    次へ
                </Button>
            </FootButton>
        </>
    );
};

export default InitialSetting;

const FootButton = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`