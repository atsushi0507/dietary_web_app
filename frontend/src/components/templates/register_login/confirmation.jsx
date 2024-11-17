"use client";
import React from "react";
import Title from "@/components/atoms/Title";
import { Typography } from "@mui/material";
import Button from "@/components/atoms/Button";

const ConfirmationTemplate = ({ answers, questions, onEdit, onNext }) => {
  return (
    <div>
      <Typography variant="h3" >確認画面</Typography>
      <ul>
        {questions.map((question) => (
          <li key={question.id} style={{ marginBottom: "20px" }}>
            <strong>{question.label}:</strong> {answers[question.id]}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button onClick={onEdit}>戻る</Button>
        <Button onClick={onNext}>次へ</Button>
      </div>
    </div>
  );
};

export default ConfirmationTemplate;
