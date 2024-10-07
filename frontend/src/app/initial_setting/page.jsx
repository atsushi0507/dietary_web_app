"use client";
import React, { useState } from "react";
import InitialSetting from "@/components/templates/register_login/initial_setting";
import ConfirmationTemplate from "@/components/templates/register_login/confirmation";
import questions from "@/public/setting_questions.json";

const InitialSettingPage = () => {
    const [currentScreen, setCurrentScreen] = useState("setup");
    const [answers, setAnswers] = useState({});

    const handleAnswersUpdate = (newAnswers) => {
        setAnswers(newAnswers);
      };
    
      const handleNextToConfirmation = () => {
        setCurrentScreen("confirmation");
      };
    
      const handleBackToEdit = () => {
        setCurrentScreen("setup");
      };

    return (
        <div>
      {currentScreen === "setup" ? (
        <InitialSetting
          questions={questions}
          answers={answers}
          onNext={handleNextToConfirmation}
          onAnswersUpdate={handleAnswersUpdate}
        />
      ) : (
        <ConfirmationTemplate
          questions={questions}
          answers={answers}
          onEdit={handleBackToEdit}
        />
      )}
    </div>
    );
};

export default InitialSettingPage;