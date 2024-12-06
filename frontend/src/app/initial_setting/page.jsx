"use client";
import React, { useState } from "react";
import InitialSetting from "@/components/templates/register_login/initial_setting";
import ConfirmationTemplate from "@/components/templates/register_login/confirmation";
import FinalView from "@/components/templates/register_login/final_view";
import questions from "@/public/setting_questions.json";

const InitialSettingPage = () => {
    const [currentScreen, setCurrentScreen] = useState("setup");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleAnswersUpdate = (newAnswers) => {
        setAnswers(newAnswers);
      };
    
      const handleNext = () => {
        if (currentScreen === "confirmation") {
            setCurrentScreen("final")
        } else setCurrentScreen("confirmation");
      };
    
      const handleBack = () => {
        if (currentScreen === "confirmation") {
            setCurrentScreen("setup");
            setCurrentQuestionIndex(5);
        } else if (currentScreen === "final") {
            setCurrentScreen("confirmation");
        }
      };

      return (
        <div>
          {(() => {
            if (currentScreen === "setup") {
              return (
                <InitialSetting
                  questions={questions}
                  answers={answers}
                  onNext={handleNext}
                  onAnswersUpdate={handleAnswersUpdate}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                />
              );
            } else if (currentScreen === "confirmation") {
              return (
                <ConfirmationTemplate
                  questions={questions}
                  answers={answers}
                  onEdit={handleBack}
                  onNext={handleNext} // "final"へ進むボタン
                />
              );
            } else if (currentScreen === "final") {
              return (
                <FinalView // 摂取カロリーやPFCの量を表示する画面
                  answers={answers} 
                  onPrevious={handleBack}
                />
              );
            } else {
              return <div>Unknown screen</div>;
            }
          })()}
        </div>
      );
      
};

export default InitialSettingPage;