"use client";
import Button from "@/components/atoms/Button";
import React from "react";
import styled from "styled-components";
import useCalorieAndPFC from "@/hooks/useCalorieAndPFC";
import { Typography } from "@mui/material";
import axios from "axios";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const FinalView = ({ answers, onPrevious}) => {
    const {calorieIntake, protein, fat, carbs} = useCalorieAndPFC(answers);
    const router = useRouter();

    const addUserToFS = async () => {
        try {
            const user = auth.currentUser;
            if (!user || !user.uid) {
                console.error("User is not authenticated or UID is missing.");
                return;
            }
            const uid = user.uid;
    
            const userData = {
                "user_id": uid,
                "height": parseFloat(answers.height),
                "weight": parseFloat(answers.weight),
                "birthday": answers.birthday,
                "gender": answers.gender,
                "activityLevel": answers.activityLevel,
                "goal": answers.goal,
                "cal": calorieIntake,
                "protein": protein,
                "fat": fat,
                "carb": carbs
            };
    
            // Firestore への書き込み
            const response = await axios.post(
                "https://asia-northeast1-dietary-web-app.cloudfunctions.net/add_user",
                userData
            );
    
            // ローカルストレージへの保存
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log("User data saved to localStorage.");
    
            // ページ遷移
            await router.push("/home"); // `await` で非同期遷移を確実に処理
            console.log("Navigation to /home successful.");
        } catch (error) {
            if (error.response) {
                // サーバー側のレスポンスエラー
                console.error("Error response from server: ", {
                    data: error.response.data,
                    status: error.response.status,
                    headers: error.response.headers,
                });
            } else if (error.request) {
                // リクエスト送信済みだがレスポンスなし
                console.error("No response received: ", error.request);
            } else {
                // リクエスト設定のエラー
                console.error("Error at add user to firestore: ", error.message);
            }
        }
    };
    

    return (
        <>
            <Typography variant="h4">
                あなたの一日の目安です
            </Typography>
            <ResultView>
                <FactorArea>
                    <Typography variant="bold1" sx={{fontWeight: "bold"}}>
                        摂取カロリー: 
                    </Typography>
                    <span>{calorieIntake} kcal</span>
                </FactorArea>
                <FactorArea>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        タンパク質: 
                    </Typography>
                    <span>{protein} g</span>
                </FactorArea>
                <FactorArea>
                    <Typography variant="bold1" sx={{fontWeight: "bold"}}>
                        脂質: 
                    </Typography>
                    <span>{fat} g</span>
                </FactorArea>
                <FactorArea>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        炭水化物: 
                    </Typography>
                    <span>{carbs} g</span>
                </FactorArea>
            </ResultView>

            <SampleMenuArea>
                <Typography variant="h5">
                    サンプルメニュー
                </Typography>
            </SampleMenuArea>            

            <FootButton>
                <Button onClick={onPrevious}>
                    戻る
                </Button>
                <Button onClick={addUserToFS}>
                    完了
                </Button>
            </FootButton>
        </>
    );
};

export default FinalView;

const ResultView = styled.div`
    display: flex;
    flex-direction: column;
`

const FactorArea = styled.div`
    display: flex;
    flex-direction: row;
`

const FootButton = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`

const SampleMenuArea = styled.div`
    background-color: gray;
`