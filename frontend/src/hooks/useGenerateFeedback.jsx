"use client";
import React, { useMemo } from "react";
import feedbackMessages from "@/public/complete_feedback_messages.json";

const useGenerateFeedback = (evaluation) => {
    const calorieScore = evaluation.カロリー達成度;
    const pfcBalanceScore = evaluation.PFCバランス;
    const mealBalanceScore = evaluation.食事バランス;
    const calorieDeviation = evaluation.calorieDeviation;
    const pfcDeviation = evaluation.deviation;
    const balanceDeviation = evaluation.calorieBalanceDeviation;

    // カロリー達成度の判定
    const evaluateCalorieFeedback = (calorieScore) => {
        if (calorieScore >= 3.75) return "完璧";
        if (calorieScore >= 2.5) return "良好";
        if (calorieScore >= 1.25) return "要改善";
        return "大幅改善必須";
    };

    // PFC バランスの判定
    const evaluatePFCBalanceFeedback = (pfcBalanceScore) => {
        if (pfcBalanceScore >= 3.2) return "バランス良好";
        if (pfcBalanceScore >= 1.6) return "要改善";
        return "大幅改善必須";
    };

    // 食事バランスの判定
    const evaluateMealBalanceFeedback = (mealBalanceScore) => {
        if (mealBalanceScore >= 3.2) return "理想的";
        if (mealBalanceScore >= 1.6) return "偏りあり";
        return "大幅な偏りあり";
    };

    const feedback = useMemo(() => {
        // カロリー達成度、PFC バランス、食事バランスの判定結果を取得
        const calorieFeedback = evaluateCalorieFeedback(calorieScore);
        const pfcBalanceFeedback = evaluatePFCBalanceFeedback(pfcBalanceScore);
        const mealBalanceFeedback = evaluateMealBalanceFeedback(mealBalanceScore);

        // 具体的なフィードバックメッセージを探す
        const message = feedbackMessages.find((messageObj) => {
            return (
                messageObj.calorie === calorieFeedback &&
                messageObj.pfc_balance === pfcBalanceFeedback &&
                messageObj.calorie_balance === mealBalanceFeedback
            );
        });

        // メッセージが見つからなければ、デフォルトのメッセージを設定
        let finalMessage = "フィードバックが適用できませんでした。";

        if (message) {
            finalMessage = message.message;

            // 動的な変数の埋め込み処理
            if (message.message.includes("{meal}") && calorieDeviation) {
                finalMessage = finalMessage.replace(
                    "{meal}",
                    calorieDeviation.type
                );
                finalMessage = finalMessage.replace(
                    "{vol2}",
                    Math.abs(calorieDeviation.value)
                );
                finalMessage = finalMessage.replace(
                    "{high_low2}",
                    calorieDeviation.high_low === "+" ? "多い" : "少ない"
                );
            }
        }

        // フィードバックをまとめる
        return finalMessage;
    }, [evaluation]);

    return feedback;
};

export default useGenerateFeedback;
