"use client";
import React from "react";
import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";

const ConfirmationTemplate = ({ answers, questions, onEdit }) => {
  return (
    <div>
      <Title>確認画面</Title>
      <ul>
        {questions.map((question) => (
          <li key={question.id} style={{ marginBottom: "20px" }}>
            <strong>{question.label}:</strong> {answers[question.id]}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button onClick={onEdit}>戻る</Button>
        <Button onClick={() => alert("完了しました！")}>完了</Button>
      </div>
    </div>
  );
};

export default ConfirmationTemplate;
